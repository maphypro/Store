package com.jwt.security.demo;

import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.util.ArrayList;

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
