package com.jwt.security.service;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.GetUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateUserService {

    private final JwtService jwtService;
    public GetUserResponse getUser(User user){
        GetUserResponse updateUserResponse = new GetUserResponse();
        updateUserResponse.setFirstName(user.getFirstname());
        updateUserResponse.setLastName(user.getLastname());
        updateUserResponse.setEmail(user.getEmail());

        return updateUserResponse;
    }

    public AuthenticationResponse generateToken(User user) {

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }
}
