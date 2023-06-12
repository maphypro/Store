package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.GetUserResponse;
import com.jwt.security.requestResponse.Message;
import com.jwt.security.requestResponse.UpdateUserRequest;
import com.jwt.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @GetMapping("/creator")
    public ResponseEntity<Message> addCreator(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(userService.saveUserCreator(user));
    }

    @GetMapping("/update")
    public ResponseEntity<GetUserResponse> getUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getUser(user));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> updateUser(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(user, request));
    }
}
