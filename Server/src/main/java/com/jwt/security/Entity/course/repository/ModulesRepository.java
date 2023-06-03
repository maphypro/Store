package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Modules;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModulesRepository extends JpaRepository<Modules, Long> {
}
