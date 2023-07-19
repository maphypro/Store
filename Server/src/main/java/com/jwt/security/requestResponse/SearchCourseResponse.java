package com.jwt.security.requestResponse;

import com.jwt.security.Entity.course.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchCourseResponse {
    private HttpStatus status;
    private List<CourseResponse> courses;
}
