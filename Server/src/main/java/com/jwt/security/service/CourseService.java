package com.jwt.security.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.course.Lesson;
import com.jwt.security.Entity.course.Modules;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.course.repository.CourseRepository;
import com.jwt.security.Entity.course.repository.LessonRepository;
import com.jwt.security.Entity.course.repository.ModulesRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.exception.YourCustomException;
import com.jwt.security.requestResponse.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {


    private final CourseRepository courseRepository;
    private final ModulesRepository modulesRepository;
    private final ModulesService modulesService;
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;

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


    public FullCourseResponse fullCourse(FullCourseRequest request) {
        long courseId = request.getCourseId();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        course.getModules().removeAll(course.getModules());
        course.setModules(modulesService.updateModules(course, request.getModules()));
        System.out.println(course.getModules().size()+ " <=====");
        lessonService.updateLessons(course, request.getLessons());

        modulesRepository.saveAll(course.getModules());
        courseRepository.save(course);

        return getFullCourse(courseId);
    }

//    private void fullUpdateCourse(Modules module, ModulesRequest moduleRequest, List<LessonRequest> lessons, Course course) {
//        module.setTitle(moduleRequest.getTitle());
//        module.setDescription(moduleRequest.getDescription());
//        module.setModuleNumber(moduleRequest.getModuleNumber());
//        module.setCourse(course);
//        module.setCode(moduleRequest.getCode());
//        if (!course.getModules().contains(module)) {
//            course.getModules().add(module);
//        }
//        //modulesRepository.save(module);
//        List<Lesson> lessonsToSave = new ArrayList<>();
//        List<LessonRequest> lessonsToRemove = new ArrayList<>();
//
//        for (LessonRequest lessonRequest : lessons) {
//            if (lessonRequest.getCode().equals(moduleRequest.getCode())) {
//                Long lessonRequestId = lessonRequest.getId();
//
//                Lesson lesson = module.getLessons().stream()
//                        .filter(l -> Objects.equals(l.getId(), lessonRequestId) && l.getId() != null)
//                        .findFirst()
//                        .orElseGet(Lesson::new);
//
//                lesson.setTitle(lessonRequest.getTitle());
//                lesson.setModules(module);
//                lesson.setLessonNumber(lessonRequest.getLessonNumber());
//                lesson.setCode(lessonRequest.getCode());
//                lessonsToSave.add(lesson);
//                lessonsToRemove.add(lessonRequest);
//            }
//        }
//
//        module.getLessons().removeIf(lesson -> !lessonsToSave.contains(lesson));
//        lessons.removeAll(lessonsToRemove);
//
//        lessonRepository.deleteAll(module.getLessons().stream()
//                .filter(l -> !lessonsToSave.contains(l))
//                .collect(Collectors.toList()));
//
//        lessonRepository.saveAll(lessonsToSave);
//        module.getLessons().addAll(lessonsToSave);
//    }

    public FullCourseResponse getFullCourse(Long courseId){
        FullCourseResponse fullCourseResponse = new FullCourseResponse();
        // Получение курса по courseId или выброс исключения, если курс не найден
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        fullCourseResponse.setCourseId(courseId);
        List<ModulesResponse> modulesResponses = new ArrayList<>();
        List<LessonResponse> lessonResponses = new ArrayList<>();

        for(Modules modules : course.getModules()){
            ModulesResponse modulesResponse = new ModulesResponse();
            modulesResponse.setId(modules.getId());
            modulesResponse.setTitle(modules.getTitle());
            modulesResponse.setDescription(modules.getDescription());
            modulesResponse.setModuleNumber(modules.getModuleNumber());
            modulesResponse.setCode(modules.getCode());
            modulesResponses.add(modulesResponse);
            System.out.println(modules.getLessons().size());
            if(modules.getLessons().size() != 0){
                for(Lesson lesson : modules.getLessons()){
                    LessonResponse lessonResponse = new LessonResponse();
                    lessonResponse.setId(lesson.getId());
                    lessonResponse.setTitle(lesson.getTitle());
                    lessonResponse.setModuleId(modules.getId());
                    lessonResponse.setLessonNumber(lesson.getLessonNumber());
                    lessonResponse.setCode(lesson.getCode());
                    lessonResponse.setStatus("");
                    lessonResponses.add(lessonResponse);
                }
            }

        }

        fullCourseResponse.setModules(modulesResponses);
        fullCourseResponse.setLessons(lessonResponses);
        return fullCourseResponse;
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
