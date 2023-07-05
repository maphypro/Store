package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullCourseResponse {
    private Long courseId;
    private List<ModulesResponse> modules;
    private List<LessonResponse> lessons;

    public List<ModulesResponse> getModules() {
        // Если у вас есть список модулей в переменной modulesResponseList, верните его
        if (modules != null) {
            return modules;
        }

        // Если modulesResponseList равен null, верните пустой список
        return new ArrayList<>();
    }
    public List<LessonResponse> getLessons() {
        // Если у вас есть список модулей в переменной modulesResponseList, верните его
        if (lessons != null) {
            return lessons;
        }

        // Если modulesResponseList равен null, верните пустой список
        return new ArrayList<>();
    }
}
