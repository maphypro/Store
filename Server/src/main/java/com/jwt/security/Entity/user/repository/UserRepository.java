package com.jwt.security.Entity.user.repository;

import com.jwt.security.Entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Override
    <S extends User> S save(S entity);
}