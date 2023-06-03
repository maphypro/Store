package com.jwt.security.Entity.user;

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
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue
    private  Integer id;


    private String avatar;

    private Integer rating;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
}
