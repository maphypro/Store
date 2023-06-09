package com.jwt.security.service;

import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.GetUserResponse;
import com.jwt.security.requestResponse.UpdateUserRequest;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UpdateUserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public GetUserResponse getUser(User user){
        GetUserResponse updateUserResponse = new GetUserResponse();
        updateUserResponse.setFirstName(user.getFirstname());
        updateUserResponse.setLastName(user.getLastname());
        updateUserResponse.setEmail(user.getEmail());

        return updateUserResponse;
    }

    public AuthenticationResponse updateUser(User user, UpdateUserRequest request) {
        user.setFirstname(request.getFirstName());
        user.setLastname(request.getLastName());
        user.setEmail(request.getEmail());
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
