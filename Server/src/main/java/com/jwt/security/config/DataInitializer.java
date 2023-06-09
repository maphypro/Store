package com.jwt.security.config;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.user.Roles;
import com.jwt.security.Entity.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;
    private final CategoriesRepository categoriesRepository;

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
    }
}