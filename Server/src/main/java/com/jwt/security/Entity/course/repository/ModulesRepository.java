package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Modules;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModulesRepository extends JpaRepository<Modules, Long> {

    List<Modules> findAllByCourseId(long courseId);
}
