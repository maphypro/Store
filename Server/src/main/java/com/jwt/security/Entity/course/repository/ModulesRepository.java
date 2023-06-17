package com.jwt.security.Entity.course.repository;

import com.jwt.security.Entity.course.Modules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModulesRepository extends JpaRepository<Modules, Long> {

    List<Modules> findAllByCourseId(long courseId);

    @Query("SELECT m FROM Modules m JOIN m.course c JOIN c.courseCreator cc WHERE c.id = :courseId AND cc.id = :creatorId")
    List<Modules> findModulesByCourseIdAndCreatorId(@Param("courseId") Long courseId, @Param("creatorId") Long creatorId);

    List<Modules> findByCourseId(long courseId);
}
