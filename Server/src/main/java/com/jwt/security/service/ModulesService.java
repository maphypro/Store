package com.jwt.security.service;

import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.course.Modules;
import com.jwt.security.Entity.course.repository.CourseRepository;
import com.jwt.security.Entity.course.repository.ModulesRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.exception.YourCustomException;
import com.jwt.security.requestResponse.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModulesService {
    private final CourseRepository courseRepository;
    private final ModulesRepository modulesRepository;

    public List<ModulesResponse> addModule(AddModuleRequest request) {
        long courseId = request.getCourseId();
        List<ModulesRequest> moduleRequests = request.getModules();
        List<ModulesResponse> listModulesResponses = new ArrayList<>();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        for (ModulesRequest moduleRequest : moduleRequests) {
            Modules modules = new Modules();
            modules.setModuleNumber(moduleRequest.getModuleNumber());
            modules.setTitle(moduleRequest.getTitle());
            modules.setDescription(moduleRequest.getDescription());
            modules.setCourse(course);

            course.getModules().add(modules);
        }
        // Сохранение всех модулей в базе данных
        List<Modules> savedModules = modulesRepository.saveAll(course.getModules());

        for (Modules savedModule : savedModules) {
            listModulesResponses.add(modulesResponse(savedModule, savedModule.getId()));
        }
        courseRepository.save(course);
        return listModulesResponses;
    }

    public List<ModulesResponse> getModules(Long id, User user) {
        Long courseId = courseRepository.findById(id)
                .orElseThrow(() -> new YourCustomException("Course not found")).getId();
        Long creatorId = user.getCourseCreator().getId();
        List<Modules> ListModules =
                modulesRepository.findModulesByCourseIdAndCreatorId(courseId, creatorId);

        List<ModulesResponse> listModulesResponses = new ArrayList<>();
        for (Modules modules : ListModules) {
            listModulesResponses.add(modulesResponse(modules, null));
        }
        return listModulesResponses;
    }

    public ModulesResponse modulesResponse(Modules modules, Long id) {
        ModulesResponse modulesResponse = new ModulesResponse();
        if (id == null) {
            modulesResponse.setId(modules.getId());
        } else {
            modulesResponse.setId(id);
        }
        modulesResponse.setModuleNumber(modules.getModuleNumber());
        modulesResponse.setTitle(modules.getTitle());
        modulesResponse.setDescription(modules.getDescription());

        return modulesResponse;
    }

    public List<ModulesResponse> updateModules(UpdateDeleteRequest request) {
        long courseId = request.getCourseId();
        List<ModulesRequest> moduleRequests = request.getModules();

        // Получение курса по courseId или выброс исключения, если курс не найден
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));

        // Список для хранения ответов с информацией об обновленных модулях
        List<ModulesResponse> listModulesResponses = new ArrayList<>();

        // Получение списка идентификаторов модулей, присутствующих в текущем запросе
        List<Long> moduleRequestIds = moduleRequests.stream()
                .map(ModulesRequest::getId)
                .collect(Collectors.toList());

        // Получение списка модулей, которые нужно удалить
        List<Modules> modulesToDelete = course.getModules().stream()
                .filter(module -> !moduleRequestIds.contains(module.getId()))
                .collect(Collectors.toList());

        // Удаление модулей из списка модулей курса
        course.getModules().removeAll(modulesToDelete);

        // Удаление модулей, которые отсутствуют в текущем запросе, из базы данных
        modulesRepository.deleteAll(modulesToDelete);

        // Обновление каждого модуля
        for (ModulesRequest moduleRequest : moduleRequests) {
            Long moduleRequestId = moduleRequest.getId();

            Modules modules = course.getModules().stream()
                    .filter(module -> Objects.equals(module.getId(), moduleRequestId) && module.getId() != null)
                    .findFirst()
                    .orElseGet(Modules::new);

            modules.setCourse(course);
            modules.setTitle(moduleRequest.getTitle());
            System.out.println(modules.getTitle());
            modules.setDescription(moduleRequest.getDescription());
            modules.setModuleNumber(moduleRequest.getModuleNumber());

            if (!course.getModules().contains(modules)) {
                course.getModules().add(modules);
            }
        }
    System.out.println(course.getModules().size());
        // Сохранение всех модулей в базе данных
        List<Modules> savedModules = modulesRepository.saveAll(course.getModules());
        System.out.println(savedModules.size());
        // Создание объектов ModulesResponse и добавление их в список
        for (Modules savedModule : savedModules) {
            listModulesResponses.add(modulesResponse(savedModule, savedModule.getId()));
        }

        // Сохранение обновленного курса
        courseRepository.save(course);

        // Возвращение списка с информацией об обновленных модулях
        return listModulesResponses;
    }

    public Message deleteModules(UpdateDeleteRequest request) {
        long courseId = request.getCourseId();
        List<ModulesRequest> moduleRequests = request.getModules();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        // Получение списка идентификаторов модулей, присутствующих в текущем запросе
        List<Long> moduleRequestIds = moduleRequests.stream()
                .map(ModulesRequest::getId)
                .collect(Collectors.toList());
        // Получение списка модулей, которые нужно удалить
        List<Modules> modulesToDelete = course.getModules().stream()
                .filter(module -> moduleRequestIds.contains(module.getId()))
                .collect(Collectors.toList());
        // Удаление модулей из списка модулей курса
        course.getModules().removeAll(modulesToDelete);

        // Удаление модулей, которые отсутствуют в текущем запросе, из базы данных
        modulesRepository.deleteAll(modulesToDelete);
        return new Message("delete");
    }

}
