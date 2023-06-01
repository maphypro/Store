package com.jwt.security.Entity.text;

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
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue
    private  Integer id;

    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
