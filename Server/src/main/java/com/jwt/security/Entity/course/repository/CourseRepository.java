package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.user.CourseCreator;
import com.jwt.security.Entity.user.User;
import com.sun.jdi.LongValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByTitle(String title);

    List<Course> findByCourseCreatorId(Long creatorId);

    List<Course> findByTitleContainingIgnoreCase(String title);

    @Query(value = "SELECT c FROM Course c WHERE levenshtein(:title, c.title) <= :maxDistance")
    List<Course> findByTitleLevenshteinDistance(@Param("title") String title, @Param("maxDistance") int maxDistance);

    @Query(value = "SELECT * FROM course TABLESAMPLE SYSTEM(1) LIMIT :limit", nativeQuery = true)
    List<Course> findRandomCourses(@Param("limit") int limit);

    @Query(value = "SELECT COUNT(*) FROM course", nativeQuery = true)
    int getTotalCourseCount();
}
