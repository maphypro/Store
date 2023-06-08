package com.jwt.security.service;


import com.jwt.security.Entity.user.CourseCreator;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.CourseCreatorRepository;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.exception.YourCustomException;
import com.jwt.security.requestResponse.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CourseCreatorRepository courseCreatorRepository;
    public Message saveUserCreator(User user) {
        try {
            User existingUser = userRepository.findById(user.getId()).orElse(null);
            if (existingUser != null) {
                CourseCreator courseCreator = new CourseCreator();
                courseCreator.setUser(existingUser);

                existingUser.setCourseCreator(courseCreator);

                courseCreatorRepository.save(courseCreator);
                userRepository.save(existingUser);
            }
        } catch (DataIntegrityViolationException e) {
            return new Message("You are the creator");
        }
        return new Message("Successfull");
    }
}
