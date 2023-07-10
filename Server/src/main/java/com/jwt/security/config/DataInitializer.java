package com.jwt.security.config;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.user.Role;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.RegisterRequest;
import com.jwt.security.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import static com.jwt.security.Entity.user.Role.ADMIN;
import static com.jwt.security.Entity.user.Role.MANAGER;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final CategoriesRepository categoriesRepository;

    private final AuthenticationService service;

    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (!categoriesRepository.existsByName("prog")) {
            Categories categories = new Categories();
            categories.setName("prog");
            categoriesRepository.save(categories);
        }

        if (!categoriesRepository.existsByName("analitic")) {
            Categories categories = new Categories();
            categories.setName("analitic");
            categoriesRepository.save(categories);
        }
        if (!userRepository.existsByEmail("admin@mail.com")) {
            var admin = RegisterRequest.builder()
                    .firstName("Admin")
                    .lastName("Admin")
                    .email("admin@mail.com")
                    .password("password")
                    .role(ADMIN.name())
                    .confirmPassword("password")
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());
        }
        if (!userRepository.existsByEmail("manager@mail.com")) {
            var manager = RegisterRequest.builder()
                    .firstName("Manager")
                    .lastName("Manager")
                    .email("manager@mail.com")
                    .password("password")
                    .role(MANAGER.name())
                    .confirmPassword("password")
                    .build();
            System.out.println("Manager token: " + service.register(manager).getAccessToken());
        }
    }
}