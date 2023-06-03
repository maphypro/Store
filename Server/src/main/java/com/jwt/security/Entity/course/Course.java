package com.jwt.security.Entity.course;

import com.jwt.security.Entity.user.CourseCreator;
import com.jwt.security.Entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private CourseCreator courseCreator;

    @JoinColumn(name = "members_count")
    private Integer memberCount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories categories;

    @ManyToMany(mappedBy = "courses")
    private List<User> users;

    // Остальные поля, геттеры/сеттеры
}