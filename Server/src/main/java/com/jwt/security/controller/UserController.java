package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.Message;
import com.jwt.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/user/create")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;
    @GetMapping("/creator")
    public ResponseEntity<Message> addCreator(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(userService.saveUserCreator(user));
    }
}
