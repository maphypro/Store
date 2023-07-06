package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Lesson;
import com.jwt.security.Entity.course.Modules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findAllByModulesId(long modulesId);

    @Query("SELECT l FROM Lesson l JOIN l.modules m JOIN m.course c WHERE m.id = :modulesId")
    List<Lesson> findLessonsByModulesId(@Param("modulesId") Long modulesId);

    @Query("SELECT l FROM Lesson l JOIN l.modules m JOIN m.course c WHERE c.id = :courseId")
    List<Lesson> findAllLessonsWxithCourse(@Param("courseId") Long courseId);

    @Query("SELECT l FROM Lesson l JOIN l.modules m JOIN m.course c JOIN c.courseCreator cc " +
            "WHERE m.id = :modulesId AND cc.id = :creatorId")
    List<Lesson> findLessonsByCourseIdAndCreatorId(
            @Param("modulesId") Long modulesId,
            @Param("creatorId") Long creatorId
    );

}
