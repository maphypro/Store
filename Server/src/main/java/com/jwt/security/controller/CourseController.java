package com.jwt.security.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.*;
import com.jwt.security.service.CourseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
@Tag(name = "course")
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

    @GetMapping("/creator_courses")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseResponse>> allCourseCreator(
            @AuthenticationPrincipal User user
    ){

        return courseService.allCourseCreator(user);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoriesResponse>> getCategories(){

        return ResponseEntity.ok(courseService.getCategories());
    }


    @PostMapping("/save_course")
    public ResponseEntity<FullCourseResponse> saveCourse(@RequestBody FullCourseRequest course) {
        // Вызов сервисного метода для сохранения курса
        FullCourseResponse fullCourseResponse = courseService.fullCourse(course);
        if (fullCourseResponse != null) {
            return ResponseEntity.ok(fullCourseResponse);
        } else {
            return ResponseEntity.badRequest().body(fullCourseResponse);
        }
    }

    @GetMapping("/get_full_course")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FullCourseResponse> getModules(
            @AuthenticationPrincipal User user,
            @RequestParam Long id
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(courseService.getFullCourse(id));
    }
}
