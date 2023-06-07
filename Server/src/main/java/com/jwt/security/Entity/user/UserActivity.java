package com.jwt.security.Entity.user;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users_activity")
public class UserActivity {
    @Id
    @GeneratedValue
    private  Long id;

    @JoinColumn(name = "visit_date")
    private Timestamp visitDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
