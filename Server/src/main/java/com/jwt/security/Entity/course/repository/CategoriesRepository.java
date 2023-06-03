package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Categories, Long> {
}
