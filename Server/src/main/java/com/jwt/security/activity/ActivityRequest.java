package com.jwt.security.activity;

import com.jwt.security.Entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequest {

    private Timestamp visitDate;

    private User user;
}
