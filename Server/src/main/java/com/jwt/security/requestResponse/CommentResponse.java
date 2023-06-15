package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private Long id;
    private Long userId;
    private String userName;
    private String text;
    private Long lessonId;
}
