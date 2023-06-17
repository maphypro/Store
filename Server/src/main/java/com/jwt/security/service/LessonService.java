package com.jwt.security.service;

import com.jwt.security.Entity.course.Lesson;
import com.jwt.security.Entity.course.Modules;
import com.jwt.security.Entity.course.repository.LessonRepository;
import com.jwt.security.Entity.course.repository.ModulesRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.exception.YourCustomException;
import com.jwt.security.requestResponse.AddLessonRequest;
import com.jwt.security.requestResponse.LessonRequest;
import com.jwt.security.requestResponse.LessonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final ModulesRepository modulesRepository;
    private final LessonRepository lessonRepository;
    public List<LessonResponse> addLesson(AddLessonRequest request) {
        long moduleId = request.getModuleId();
        List<LessonRequest> lessonRequests = request.getLessons();
        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        Modules modules = modulesRepository.findById(moduleId)
                .orElseThrow(() -> new YourCustomException("Module not found"));
        int i = 0;
        for (LessonRequest lessonRequest : lessonRequests) {
            Lesson lesson = new Lesson();
            lesson.setLessonNumber(i++);
            lesson.setName(lessonRequest.getName());
            lesson.setModules(modules);
            Long lessonId = lessonRepository.save(lesson).getId();
            ListModulesResponses.add(lessonResponse(lesson, lessonId));
        }

        return ListModulesResponses;
    }

    public List<LessonResponse> getLesson(User user, Long modulesId){
        Long creatorId = user.getCourseCreator().getId();
        List<Lesson> ListModules =
                lessonRepository.findLessonsByCourseIdAndCreatorId(modulesId, creatorId);

        List<LessonResponse> ListModulesResponses = new ArrayList<>();
        for (Lesson lesson : ListModules) {
            ListModulesResponses.add(lessonResponse(lesson, null));
        }
        return ListModulesResponses;
    }

    public LessonResponse lessonResponse(Lesson lesson, Long id){
        LessonResponse lessonResponse = new LessonResponse();
        if(id == null){
            lessonResponse.setId(lesson.getId());
        }else{
            lessonResponse.setId(id);
        }
        lessonResponse.setLessonNumber(lesson.getLessonNumber());
        lessonResponse.setName(lesson.getName());
        lessonResponse.setModuleId(lesson.getModules().getId());

        return lessonResponse;
    }
}
