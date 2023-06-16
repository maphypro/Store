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
@Table(name = "modules")
public class Modules {

    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "module_namber")
    private Integer moduleNumber;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
