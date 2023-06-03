package com.jwt.security.Entity.user.repository;

import com.jwt.security.Entity.user.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
