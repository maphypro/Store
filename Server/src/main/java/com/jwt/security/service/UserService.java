package com.jwt.security.service;


import com.jwt.security.Entity.user.CourseCreator;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.CourseCreatorRepository;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.AuthenticationResponse;
import com.jwt.security.requestResponse.GetUserResponse;
import com.jwt.security.requestResponse.Message;
import com.jwt.security.requestResponse.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CourseCreatorRepository courseCreatorRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

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
        var refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }
    public Message saveUserCreator(User user) {
        try {
            Optional<User> existingUser = userRepository.findById(user.getId());
            if (existingUser != null) {
                CourseCreator courseCreator = new CourseCreator();
                courseCreator.setUser(existingUser.get());

                existingUser.get().setCourseCreator(courseCreator);

                courseCreatorRepository.save(courseCreator);
                userRepository.save(existingUser.get());
            }
        } catch (DataIntegrityViolationException e) {
            return new Message("You are the creator");
        }
        return new Message("Successfull");
    }
}
