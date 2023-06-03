package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
