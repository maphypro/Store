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
import com.jwt.security.Entity.text.Comment;
import com.jwt.security.Entity.text.repository.CommnetRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.*;
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
    private final ModulesRepository modulesRepository;
    private final LessonRepository lessonRepository;
    private final CategoriesRepository categoriesRepository;
    private final UserRepository userRepository;

    private final CommnetRepository commnetRepository;

    private final UserService userService;
    private final JwtService jwtService;

    public CourseRequest addCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user) {


        courseRepository.save(generateCourse(request, image, video, user));
        return request;
    }

    public NewCourseResponse newCourse(String request, User user) throws Exception {
        Long courseId;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request);
        String title = jsonNode.get("title").asText();

        Course course = new Course();
        course.setTitle(title);
        course.setCourseCreator(user.getCourseCreator());
        try {
            courseId = courseRepository.save(course).getId();
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityViolationException("Такой курс уже есть");
        }
        userService.saveUserCreator(user);
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
            CourseResponse courseResponse = new CourseResponse();
            courseResponse.setId(course.getId());
            courseResponse.setTitle(course.getTitle());
            courseResponse.setMemberCount(course.getMemberCount());
            courseResponse.setPrice(course.getPrice());
            courseResponse.setCourseTime(course.getCourseTime());
            courseResponse.setImage(course.getImage());
            courseResponse.setVideo(course.getVideo());
            courseResponse.setDescription(course.getDescription());

            courseResponses.add(courseResponse);
        }

        return new ResponseEntity<>(courseResponses, HttpStatus.OK);
    }

    public List<ModulesResponse> addModule(AddModuleRequest request) {
        long courseId = request.getCourseId();
        List<ModuleRequest> moduleRequests = request.getModules();
        List<ModulesResponse> ListModulesResponses = new ArrayList<>();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        for (ModuleRequest moduleRequest : moduleRequests) {
            Modules modules = new Modules();
            modules.setModuleNumber(moduleRequest.getModuleNumber());
            modules.setName(moduleRequest.getName());
            modules.setCourse(course);
            Long moduleId = modulesRepository.save(modules).getId();
            ModulesResponse modulesResponse = new ModulesResponse();
            modulesResponse.setId(modules.getId());
            modulesResponse.setModulesNumber(modules.getModuleNumber());
            modulesResponse.setName(modules.getName());
            ListModulesResponses.add(modulesResponse);
        }
//        List<Modules> ListModules = modulesRepository.findAllByCourseId(courseId);
//
//        List<ModulesResponse> ListModulesResponses = new ArrayList<>();
//        for (Modules modules : ListModules) {
//            ModulesResponse modulesResponse = new ModulesResponse();
//            modulesResponse.setId(modules.getId());
//            modulesResponse.setModulesNumber(modules.getModuleNumber());
//            modulesResponse.setName(modules.getName());
//            ListModulesResponses.add(modulesResponse);
//        }
        return ListModulesResponses;
    }
    public List<ModulesResponse> getModules(Long id){
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        List<Modules> ListModules = modulesRepository.findAllByCourseId(course.getId());

        List<ModulesResponse> ListModulesResponses = new ArrayList<>();
        for (Modules modules : ListModules) {
            ModulesResponse modulesResponse = new ModulesResponse();
            modulesResponse.setId(modules.getId());
            modulesResponse.setModulesNumber(modules.getModuleNumber());
            modulesResponse.setName(modules.getName());
            ListModulesResponses.add(modulesResponse);
        }
        return ListModulesResponses;
    }
    public List<LessonResponse> addLesson(AddLessonRequest request) {
        long moduleId = request.getLessonId();
        List<LessonRequest> lessonRequests = request.getLessons();
        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        Modules modules = modulesRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));

        for (LessonRequest lessonRequest : lessonRequests) {
            Lesson lesson = new Lesson();
            lesson.setLessonNumber(lessonRequest.getLessonNumber());
            lesson.setName(lessonRequest.getName());
            lesson.setModules(modules);
            Long lessonId = lessonRepository.save(lesson).getId();
            LessonResponse lessonResponse = new LessonResponse();
            lessonResponse.setId(lessonId);
            lessonResponse.setLessonNumber(lesson.getLessonNumber());
            lessonResponse.setName(lesson.getName());
            ListModulesResponses.add(lessonResponse);
        }
//        List<Lesson> ListModules = lessonRepository.findAllByModulesId(lessonId);
//
//        List<LessonResponse> ListModulesResponses = new ArrayList<>();
//        for (Lesson lesson : ListModules) {
//            LessonResponse lessonResponse = new LessonResponse();
//            lessonResponse.setId(lesson.getId());
//            lessonResponse.setLessonNumber(lesson.getLessonNumber());
//            lessonResponse.setName(lesson.getName());
//            ListModulesResponses.add(lessonResponse);
//        }
        return ListModulesResponses;
    }

    public List<LessonResponse> getLesson(Long idCourse, Long idModules){
        Course course = courseRepository.findById(idCourse)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        Modules modules = modulesRepository.findById(idModules)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        List<Lesson> ListModules = lessonRepository.findAllByModulesId(modules.getId());

        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        for (Lesson lesson : ListModules) {
            LessonResponse lessonResponse = new LessonResponse();
            lessonResponse.setId(lesson.getId());
            lessonResponse.setLessonNumber(lesson.getLessonNumber());
            lessonResponse.setName(lesson.getName());
            ListModulesResponses.add(lessonResponse);
        }
        return ListModulesResponses;
    }

    public CommentResponse addComment(CommentRequest commentRequest, User user){
        Lesson lesson = lessonRepository.findById(commentRequest.getLessonId()).orElseThrow();
        Comment comment = new Comment();
        comment.setLesson(lesson);
        comment.setUser(user);
        comment.setText(commentRequest.getText());
        Long commentId = commnetRepository.save(comment).getId();

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(commentId);
        commentResponse.setText(commentRequest.getText());
        commentResponse.setLessonId(lesson.getId());
        commentResponse.setUserId(user.getId());
        commentResponse.setUserName(user.getFirstname());

        return commentResponse;
    }

    public List<CommentResponse> getComments(Long lessonId){
        List<Comment> commentList = commnetRepository.findByLessonId(lessonId);
        List<CommentResponse> commentResponses = new ArrayList<>();
        for(Comment comment : commentList){
            CommentResponse commentResponse = new CommentResponse();
            commentResponse.setId(comment.getId());
            commentResponse.setText(comment.getText());
            commentResponse.setLessonId(comment.getLesson().getId());
            commentResponse.setUserId(comment.getUser().getId());
            commentResponse.setUserName(comment.getUser().getFirstname());
            commentResponses.add(commentResponse);
        }
        return commentResponses;
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
}
