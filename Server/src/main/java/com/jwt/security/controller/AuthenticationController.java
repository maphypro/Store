package com.jwt.security.controller;

import com.jwt.security.config.RateLimited;
import com.jwt.security.exception.YourCustomException;
import com.jwt.security.requestResponse.AuthenticationRequest;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.RegisterRequest;
import com.jwt.security.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        System.out.println("pp");
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request
    ) {

        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        try {
            service.refreshToken(request, response);
        } catch (RuntimeException ex) {
            // Обработка ошибки лимита запросов
            // Например, возвращаем ошибку с соответствующим HTTP-статусом
            throw new YourCustomException(HttpServletResponse.SC_BAD_REQUEST+ " Rate limit exceeded");
        } catch (Exception ex) {
            // Обработка других исключений, если необходимо
            // Например, возвращаем ошибку с соответствующим HTTP-статусом
            throw new YourCustomException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR + " Internal server error");
        }
    }
}
