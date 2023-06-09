package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.GetUserResponse;
import com.jwt.security.requestResponse.UpdateUserRequest;
import com.jwt.security.service.UpdateUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/user")
@RequiredArgsConstructor
public class UpdateUserController {

    private final UpdateUserService updateUserService;

    @GetMapping("/update")
    public ResponseEntity<GetUserResponse> getUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(updateUserService.getUser(user));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> updateUser(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(updateUserService.updateUser(user, request));
    }
}
