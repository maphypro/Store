package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
}
