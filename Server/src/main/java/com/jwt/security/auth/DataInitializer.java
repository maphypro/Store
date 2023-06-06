package com.jwt.security.auth;

import com.jwt.security.Entity.user.Roles;
import com.jwt.security.Entity.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.management.relation.Role;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
        // Добавьте другие роли, если необходимо
    }
}