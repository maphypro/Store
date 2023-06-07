package com.jwt.security.controller;


import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.ActivityRequest;
import com.jwt.security.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/active")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/activity")
    public ResponseEntity<String> active(
            @RequestBody ActivityRequest request,
            @AuthenticationPrincipal User user
            ) {
        return ResponseEntity.ok(activityService.userActive(request, user));
    }
}
