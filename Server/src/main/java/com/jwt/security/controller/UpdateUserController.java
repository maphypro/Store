package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.service.AuthenticationService;
import com.jwt.security.requestResponse.GetUserResponse;
import com.jwt.security.requestResponse.UpdateUserRequest;
import com.jwt.security.service.UpdateUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/home/user")
@RequiredArgsConstructor
public class UpdateUserController {

    private final UpdateUserService updateUserService;
    private final AuthenticationService service;
    @Autowired
    private final UserRepository userRepository;

    @GetMapping("/update")
    public ResponseEntity<GetUserResponse> getUser(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(updateUserService.getUser(user));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> updateUser(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateUserRequest request
    ){
        user.setFirstname(request.getFirstName());
        user.setLastname(request.getLastName());
        user.setEmail(request.getEmail());
        userRepository.save(user);
        return ResponseEntity.ok(updateUserService.generateToken(user));
    }
}
