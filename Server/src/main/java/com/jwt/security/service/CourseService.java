package com.jwt.security.service;


import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.course.repository.CourseRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.CourseRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CourseService {


    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CategoriesRepository categoriesRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository, CategoriesRepository categoriesRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.categoriesRepository = categoriesRepository;
    }
    public CourseRequest addCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user) {


        courseRepository.save(generateCourse(request,image,video,user));
        return request;
    }

    public Course generateCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user){
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
}
