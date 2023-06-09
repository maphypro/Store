package com.jwt.security.Entity.user;


import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.token.Token;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.context.config.Profiles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user",
        uniqueConstraints = @UniqueConstraint(columnNames = {"email"}))
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private  Long id;

    private String firstname;

    private String lastname;


    @Nonnull
    @Column(name = "email", unique = true)
    @EqualsAndHashCode.Include
    private String email;


    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "user_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profiles;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private CourseCreator courseCreator;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

//    @Override
//    public int hashCode() {
//        return Objects.hash(id, firstname, lastname, email, password, role,courses, profiles, courseCreator); // Используйте нужные поля для вычисления хэш-кода
//    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }


    public String getRole() {
        return role.name();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
