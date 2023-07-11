package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LessonResponse {

    private Long id;
    private Long moduleId;
    private Double lessonNumber;
    private String title;
    private Integer code;
    private String status;
}
