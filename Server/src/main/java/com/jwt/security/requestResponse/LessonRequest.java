package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LessonRequest {

    private Long id;
    private String title;
    private Double lessonNumber;
    private Integer code;
}
