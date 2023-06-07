package com.jwt.security.service;


import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.UserActivity;
import com.jwt.security.Entity.user.repository.UserActiveRepository;
import com.jwt.security.requestResponse.ActivityRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final UserActiveRepository userActiveRepository;
    public String userActive(ActivityRequest request, User user){
        var userActivity = UserActivity
                .builder()
                .visitDate(request.getVisitDate())
                .user(user).build();
        userActiveRepository.save(userActivity);
        return "Active";
    }
}
