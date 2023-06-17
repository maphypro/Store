package com.jwt.security.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.course.repository.CourseRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.CategoriesResponse;
import com.jwt.security.requestResponse.CourseRequest;
import com.jwt.security.requestResponse.CourseResponse;
import com.jwt.security.requestResponse.NewCourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {


    private final CourseRepository courseRepository;
    private final CategoriesRepository categoriesRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public CourseRequest addCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user) {


        courseRepository.save(generateCourse(request, image, video, user));
        return request;
    }

    public NewCourseResponse newCourse(String request, User user) throws Exception {
        Long courseId;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request);
        String title = jsonNode.get("title").asText();
        if(user.getCourseCreator() == null){
            user = userService.saveUserCreator(user);
        }

        Course course = new Course();
        course.setTitle(title);
        course.setCourseCreator(user.getCourseCreator());
        try {
            courseId = courseRepository.save(course).getId();
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityViolationException("Такой курс уже есть");
        }

        return new NewCourseResponse(courseId, course.getTitle(), user.getFirstname(), user.getLastname());
    }


    public Course generateCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user) {

        User existingUser = userRepository.findById(user.getId()).orElseThrow();
        Categories categories = categoriesRepository.findById(1l).orElseThrow();

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setCourseCreator(existingUser.getCourseCreator());
        course.setMemberCount(request.getMemberCount());
        course.setCategories(categories);
        course.setPrice(request.getPrice());
        course.setCourseTime(request.getCourseTime());
        course.setImage(image.getOriginalFilename());
        course.setVideo(video.getOriginalFilename());
        course.setDescription(request.getDescription());
        return course;
    }

    public ResponseEntity<List<CourseResponse>> allCourse() {
        List<Course> courses = courseRepository.findAll();

        List<CourseResponse> courseResponses = new ArrayList<>();
        for (Course course : courses) {
            courseResponses.add(courseResponse(course));
        }

        return new ResponseEntity<>(courseResponses, HttpStatus.OK);
    }

    public ResponseEntity<List<CourseResponse>> allCourseCreator(User user){
        List<Course> courses = courseRepository.findByCourseCreatorId(user.getCourseCreator().getId());
        List<CourseResponse> courseResponses = new ArrayList<>();
        for (Course course : courses) {
            courseResponses.add(courseResponse(course));
        }
        return new ResponseEntity<>(courseResponses, HttpStatus.OK);
    }




    public List<CategoriesResponse> getCategories() {
        List<Categories> categoriesResponseList = categoriesRepository.findAll();
        List<CategoriesResponse> categoriesResponseArrayList = new ArrayList<>();
        for (Categories categories : categoriesResponseList) {
            CategoriesResponse categoriesResponse = new CategoriesResponse();
            categoriesResponse.setId(categories.getId());
            categoriesResponse.setName(categories.getName());
            categoriesResponseArrayList.add(categoriesResponse);
        }
        return categoriesResponseArrayList;
    }

    public CourseResponse courseResponse(Course course){
        CourseResponse courseResponse = new CourseResponse();
        courseResponse.setId(course.getId());
        courseResponse.setTitle(course.getTitle());
        courseResponse.setMemberCount(course.getMemberCount());
        courseResponse.setPrice(course.getPrice());
        courseResponse.setCourseTime(course.getCourseTime());
        courseResponse.setImage(course.getImage());
        courseResponse.setVideo(course.getVideo());
        courseResponse.setDescription(course.getDescription());
        return courseResponse;
    }






}
