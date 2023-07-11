package com.jwt.security.Entity.course;

import com.jwt.security.Entity.text.Comment;
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
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "lesson_number")
    private Double lessonNumber;

    private String title;
    private Integer code;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Modules modules;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}
