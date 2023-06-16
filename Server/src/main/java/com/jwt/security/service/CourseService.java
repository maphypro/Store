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
import com.jwt.security.exception.YourCustomException;
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
        if(user.getCourseCreator() == null){
            userService.saveUserCreator(user);
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

    public List<ModulesResponse> addModule(AddModuleRequest request) {
        long courseId = request.getCourseId();
        List<ModuleRequest> moduleRequests = request.getModules();
        List<ModulesResponse> ListModulesResponses = new ArrayList<>();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        int i = 0;
        for (ModuleRequest moduleRequest : moduleRequests) {
            Modules modules = new Modules();
            modules.setModuleNumber(i++);
            modules.setName(moduleRequest.getName());
            modules.setDescription(moduleRequest.getDescription());
            modules.setCourse(course);
            Long moduleId = modulesRepository.save(modules).getId();
            ListModulesResponses.add(modulesResponse(modules, moduleId));
        }
        return ListModulesResponses;
    }
    public List<ModulesResponse> getModules(Long id){
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        List<Modules> ListModules = modulesRepository.findAllByCourseId(course.getId());

        List<ModulesResponse> ListModulesResponses = new ArrayList<>();
        for (Modules modules : ListModules) {
            ListModulesResponses.add(modulesResponse(modules, null));
        }
        return ListModulesResponses;
    }
    public List<LessonResponse> addLesson(AddLessonRequest request) {
        long moduleId = request.getModuleId();
        List<LessonRequest> lessonRequests = request.getLessons();
        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        Modules modules = modulesRepository.findById(moduleId)
                .orElseThrow(() -> new YourCustomException("Module not found"));
        int i = 0;
        for (LessonRequest lessonRequest : lessonRequests) {
            Lesson lesson = new Lesson();
            lesson.setLessonNumber(i++);
            lesson.setName(lessonRequest.getName());
            lesson.setModules(modules);
            Long lessonId = lessonRepository.save(lesson).getId();
            ListModulesResponses.add(lessonResponse(lesson, lessonId));
        }

        return ListModulesResponses;
    }

    public List<LessonResponse> getLesson(Long idCourse, Long modulesId){
        List<Lesson> ListModules = lessonRepository.findLessonsByModulesId(modulesId);

        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        for (Lesson lesson : ListModules) {
            ListModulesResponses.add(lessonResponse(lesson, null));
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

    public ModulesResponse modulesResponse(Modules modules, Long id){
        ModulesResponse modulesResponse = new ModulesResponse();
        if(id == null){
            modulesResponse.setId(modules.getId());
        }else{
            modulesResponse.setId(id);
        }
        modulesResponse.setModulesNumber(modules.getModuleNumber());
        modulesResponse.setName(modules.getName());
        modulesResponse.setDescription(modules.getDescription());

        return modulesResponse;
    }

    public LessonResponse lessonResponse(Lesson lesson, Long id){
        LessonResponse lessonResponse = new LessonResponse();
        if(id == null){
            lessonResponse.setId(lesson.getId());
        }else{
            lessonResponse.setId(id);
        }
        lessonResponse.setLessonNumber(lesson.getLessonNumber());
        lessonResponse.setName(lesson.getName());

        return lessonResponse;
    }
}
