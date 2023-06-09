package com.jwt.security.demo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Arr {
    private Long id;
    private String title;
    private String author;
    private String image;

    private Double price;
    private Integer rating;
    private Integer studentCount;
    private Integer CourseTime;

}
