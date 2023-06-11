package com.jwt.security.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.*;
import com.jwt.security.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/add_course")
    public ResponseEntity<CourseRequest> addCourse(
            @AuthenticationPrincipal User user,
            @RequestParam("request") String jsonRequest,
            @RequestParam("image") MultipartFile image,
            @RequestParam("video") MultipartFile video
){
        CourseRequest request;
        try {
            request  = new ObjectMapper().readValue(jsonRequest, CourseRequest.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(courseService.addCourse(request, image,video,user));
    }

    @PostMapping("/new_course")
    public ResponseEntity<NewCourseResponse> newCourse(
            @AuthenticationPrincipal User user,
            @RequestBody String jsonRequest
    ){
        System.out.println(jsonRequest);
        try {
            return ResponseEntity.ok(courseService.newCourse(jsonRequest,user));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/add_modules")
    public ResponseEntity<List<ModulesResponse>> addModules(
            @AuthenticationPrincipal User user,
            @RequestBody AddModuleRequest request
    ) {

        return ResponseEntity.ok(courseService.addModule(request));
    }

    @PostMapping("/add_lessons")
    public ResponseEntity<List<LessonResponse>> addLesson(
            @AuthenticationPrincipal User user,
            @RequestBody AddLessonRequest request
    ) {

        return ResponseEntity.ok(courseService.addLesson(request));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoriesResponse>> getCategories(){

        return ResponseEntity.ok(courseService.getCategories());
    }

    @GetMapping("/get_modules")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ModulesResponse>> getModules(
            @AuthenticationPrincipal User user,
            @RequestParam Long id
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(courseService.getModules(id));
    }

    @GetMapping("/get_lessons")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<LessonResponse>> getLessons(
            @AuthenticationPrincipal User user,
            @RequestParam Long idcourse,
            @RequestParam Long idmodules
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(courseService.getLesson(idcourse,idmodules));
    }
}
