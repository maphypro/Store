package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
