package com.jwt.security.Entity.user;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course_creators")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CourseCreator {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

//    @Override
//    public int hashCode() {
//        return Objects.hash(id, user); // Используйте нужные поля для вычисления хэш-кода
//    }
}
