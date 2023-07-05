package com.jwt.security.Entity.course;


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
@Table(name = "modules")
public class Modules {

    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "module_number")
    private Integer moduleNumber;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "modules", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> lessons;

}
