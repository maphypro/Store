package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Step;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step, Long> {
}
