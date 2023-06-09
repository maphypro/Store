package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByTitle(String title);
}
