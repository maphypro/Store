package com.jwt.security.Entity.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lesson")
public class Lesson {

    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "lesson_number")
    private Integer lessonNumber;

    private String name;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Modules modules;


}
