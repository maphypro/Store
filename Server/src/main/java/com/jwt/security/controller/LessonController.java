package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.AddLessonRequest;
import com.jwt.security.requestResponse.LessonResponse;
import com.jwt.security.service.CourseService;
import com.jwt.security.service.LessonService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lesson")
@RequiredArgsConstructor
@Tag(name = "lesson")
public class LessonController {
    private final LessonService lessonService;

    @PostMapping("/add_lessons")
    public ResponseEntity<List<LessonResponse>> addLesson(
            @AuthenticationPrincipal User user,
            @RequestBody AddLessonRequest request
    ) {

        return ResponseEntity.ok(lessonService.addLesson(request));
    }

    @GetMapping("/get_lessons")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<LessonResponse>> getLessons(
            @AuthenticationPrincipal User user,
            @RequestParam Long idmodules
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(lessonService.getLesson(user,idmodules));
    }
}
