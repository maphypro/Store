package com.jwt.security.Entity.course;


import com.jwt.security.Entity.user.User;
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
@Table(name = "course_description")
public class CourseDescription {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "course_id")
    private Course course;

    private String about;

    private String whatWillYouLearn;

    private String forWhom;

    private String initialRequirements;

    private String howIsTheTraining;

    private String whatAreYouGretting;
}
