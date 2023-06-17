package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.CommentRequest;
import com.jwt.security.requestResponse.CommentResponse;
import com.jwt.security.service.CommentService;
import com.jwt.security.service.CourseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@Tag(name = "comment")
public class CommentController {

    private CommentService commentService;
    @PostMapping("/add_comment")
    public ResponseEntity<CommentResponse> addComment(
            @AuthenticationPrincipal User user,
            @RequestBody CommentRequest commentRequest
    ){

        return ResponseEntity.ok(commentService.addComment(commentRequest,user));
    }

    @GetMapping("/get_comments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CommentResponse>> getComments(
            @AuthenticationPrincipal User user,
            @RequestParam Long idLesson
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(commentService.getComments(idLesson));
    }
}
