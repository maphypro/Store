package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private Integer memberCount;
    private Integer price;
    private Integer courseTime;
    private String image;
    private String video;
    private String description;

    // Конструкторы

    // Геттеры и сеттеры

    // Остальные методы
}