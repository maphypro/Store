package com.jwt.security.requestResponse;

import com.jwt.security.Entity.course.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullCourseRequest {
    private Long courseId;
    private List<ModulesRequest> modules;
    private List<LessonRequest> lessons;
}
