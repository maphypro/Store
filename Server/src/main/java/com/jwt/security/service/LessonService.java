package com.jwt.security.service;

import com.jwt.security.Entity.course.Course;
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
import java.util.Objects;
import java.util.stream.Collectors;

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
            lesson.setLessonNumber(lessonRequest.getLessonNumber());
            lesson.setTitle(lessonRequest.getTitle());
            lesson.setModules(modules);
            lesson.setCode(lessonRequest.getCode());
            Long lessonId = lessonRepository.save(lesson).getId();
            ListModulesResponses.add(lessonResponse(lesson, lessonId));
            modules.getLessons().add(lesson);
        }
        modulesRepository.save(modules);
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
        lessonResponse.setTitle(lesson.getTitle());
        lessonResponse.setModuleId(lesson.getModules().getId());
        lessonResponse.setCode(lesson.getCode());
        return lessonResponse;
    }

    public void updateLessons(AddLessonRequest request) {
        long moduleId = request.getModuleId();
        List<LessonRequest> lessons = request.getLessons();

        Modules module = modulesRepository.findById(moduleId).orElseThrow();
        Lesson lesson;
        for (LessonRequest lessonRequest : lessons) {
            Long lessonId = lessonRequest.getId();
            String name = lessonRequest.getTitle();

            if (lessonId != null) {
                lesson = lessonRepository.findById(lessonId).orElseThrow();
                lesson.setTitle(name);
                // Связать урок с соответствующим модулем и курсом, если необходимо
                lesson.setModules(module);
                lesson.setCode(lessonRequest.getCode());
            } else {
                lesson = new Lesson();
                lesson.setTitle(name);
                // Связать урок с соответствующим модулем и курсом, если необходимо
                lesson.setModules(module);
                lesson.setCode(lessonRequest.getCode());
                module.getLessons().add(lesson);
            }
            lessonRepository.save(lesson);
        }
        modulesRepository.save(module);
    }

    public void updateLessons(Course course, List<LessonRequest> lessonRequests) {
        // Создание списка уроков, которые будут удалены
        List<LessonRequest> lessonsToRemove = new ArrayList<>();

        for (Modules module : course.getModules()) {
            List<Lesson> lessonsToSave = new ArrayList<>();

            for (LessonRequest lessonRequest : lessonRequests) {
                if (lessonRequest.getCode().equals(module.getCode())) {
                    Lesson lesson = getLesson(lessonRequest, module);

                    lessonsToSave.add(lesson);
                    lessonsToRemove.add(lessonRequest);
                }
            }

            module.getLessons().retainAll(lessonsToSave);
            lessonRepository.deleteAll(module.getLessons().stream()
                    .filter(l -> !lessonsToSave.contains(l))
                    .collect(Collectors.toList()));
            lessonRepository.saveAll(lessonsToSave);
            module.getLessons().addAll(lessonsToSave);
        }

        lessonRequests.removeAll(lessonsToRemove);
    }
    public void deleteLessons(AddLessonRequest request) {
        long moduleId = request.getModuleId();
        List<LessonRequest> lessons = request.getLessons();

        Modules module = modulesRepository.findById(moduleId).orElseThrow();

        for (LessonRequest lessonRequest : lessons) {
            Long lessonId = lessonRequest.getId();

            if (lessonId != null) {
                Lesson lesson = lessonRepository.findById(lessonId).orElseThrow();
                // Удаление связанных записей с уроком, если необходимо
//                lesson.getComments().removeAll();
                lessonRepository.delete(lesson);
                module.getLessons().remove(lesson);
            }
        }

        modulesRepository.save(module);
    }

    public LessonResponse getLessonResponse(Lesson lesson, Long moduleId) {
        LessonResponse lessonResponse = new LessonResponse();
        lessonResponse.setId(lesson.getId());
        lessonResponse.setTitle(lesson.getTitle());
        lessonResponse.setModuleId(moduleId);
        lessonResponse.setLessonNumber(lesson.getLessonNumber());
        lessonResponse.setCode(lesson.getCode());
        lessonResponse.setStatus("");
        return lessonResponse;
    }
    public Lesson getLesson(LessonRequest lessonRequest, Modules module){
        Lesson lesson = module.getLessons().stream()
                .filter(l -> Objects.equals(l.getId(), lessonRequest.getId()))
                .findFirst()
                .orElseGet(Lesson::new);

        // Обновление свойств урока
        lesson.setTitle(lessonRequest.getTitle());
        // Связать урок с соответствующим модулем и курсом, если необходимо
        lesson.setModules(module);
        lesson.setLessonNumber(lessonRequest.getLessonNumber());
        lesson.setCode(lessonRequest.getCode());
        return lesson;
    }
}
