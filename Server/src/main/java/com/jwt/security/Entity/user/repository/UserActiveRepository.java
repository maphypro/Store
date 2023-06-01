package com.jwt.security.Entity.user.repository;


import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.Optional;

public interface UserActiveRepository extends JpaRepository<UserActivity, Long> {
}