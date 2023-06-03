package com.jwt.security.Entity.text.repository;

import com.jwt.security.Entity.text.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommnetRepository extends JpaRepository<Comment, Long> {

}
