package com.jwt.security.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.CourseRequest;
import com.jwt.security.requestResponse.NewCourseResponse;
import com.jwt.security.service.CourseService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/home/user/create")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/course")
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
}
