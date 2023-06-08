package com.jwt.security.config;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.user.Roles;
import com.jwt.security.Entity.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;
    private final CategoriesRepository categoriesRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository, CategoriesRepository categoriesRepository) {
        this.roleRepository = roleRepository;
        this.categoriesRepository = categoriesRepository;
    }

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
        // Добавьте другие роли, если необходимо
    }
}