package com.jwt.security.Entity.user.repository;

import com.jwt.security.Entity.user.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByRole(String role);
}