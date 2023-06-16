package com.jwt.security.config;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.user.Roles;
import com.jwt.security.Entity.user.repository.RoleRepository;
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

    private final RoleRepository roleRepository;
    private final CategoriesRepository categoriesRepository;

    private final AuthenticationService service;

    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (!roleRepository.existsByRole("ADMIN")) {
            Roles role1 = new Roles();
            role1.setRole("ADMIN");
            roleRepository.save(role1);
        }

        if (!roleRepository.existsByRole("USER")) {
            Roles role2 = new Roles();
            role2.setRole("USER");
            roleRepository.save(role2);
        }

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
        if (userRepository.existsByEmail("admin@mail.com")) {
            var admin = RegisterRequest.builder()
                    .firstName("Admin")
                    .lastName("Admin")
                    .email("admin@mail.com")
                    .password("password").role(ADMIN.name()).confirmPassword("password")
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());
        }

        if (userRepository.existsByEmail("manager@mail.com")) {
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