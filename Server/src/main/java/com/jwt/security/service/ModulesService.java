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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModulesService {
    private final CourseRepository courseRepository;
    private final ModulesRepository modulesRepository;

    public List<ModulesResponse> addModule(AddModuleRequest request) {
        long courseId = request.getCourseId();
        List<AddModulesRequest> moduleRequests = request.getModules();
        List<ModulesResponse> listModulesResponses = new ArrayList<>();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        for (AddModulesRequest moduleRequest : moduleRequests) {
            Modules modules = new Modules();
            modules.setModuleNumber(moduleRequest.getModulesNumber());
            modules.setName(moduleRequest.getName());
            modules.setDescription(moduleRequest.getDescription());
            modules.setCourse(course);
            Long moduleId = modulesRepository.save(modules).getId();
            listModulesResponses.add(modulesResponse(modules, moduleId));
            course.getModules().add(modules);
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
        modulesResponse.setModulesNumber(modules.getModuleNumber());
        modulesResponse.setName(modules.getName());
        modulesResponse.setDescription(modules.getDescription());

        return modulesResponse;
    }

    public List<ModulesResponse> updateModules(UpdateDeleteRequest request) {
        long courseId = request.getCourseId();
        List<ModulesRequest> moduleRequests = request.getModules();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new YourCustomException("Course not found"));
        // Получение всех модулей для обновления, связанных с указанным courseId
        List<Modules> modulesToUpdate = modulesRepository.findByCourseId(courseId);

        List<ModulesResponse> listModulesResponses = new ArrayList<>();

        // Обновление каждого модуля
        for (ModulesRequest moduleRequest : moduleRequests) {
            Long moduleRequestId = moduleRequest.getId();

            // Поиск модуля для обновления по moduleRequestId и courseId
            Optional<Modules> optionalModule = modulesToUpdate.stream()
                    .filter(module -> module.getId().equals(moduleRequestId))
                    .findFirst();
            if (optionalModule.isPresent()) {
                Modules modules = optionalModule.get();

                // Применение изменений из ModuleRequest
                modules.setName(moduleRequest.getName());
                modules.setDescription(moduleRequest.getDescription());
                modules.setModuleNumber(moduleRequest.getModulesNumber());

                // Сохранение обновленного модуля
                modulesRepository.save(modules);
                listModulesResponses.add(modulesResponse(modules, modules.getId()));
            }
            else {
                Modules modules = new Modules();
                modules.setName(moduleRequest.getName());
                modules.setDescription(moduleRequest.getDescription());
                modules.setModuleNumber(moduleRequest.getModulesNumber());
                modules.setCourse(course);
                long modulesId = modulesRepository.save(modules).getId();
                listModulesResponses.add(modulesResponse(modules, modulesId));
            }
        }
        return listModulesResponses;
    }

    public Message deleteModules(UpdateDeleteRequest request){
        long courseId = request.getCourseId();
        List<ModulesRequest> moduleRequests = request.getModules();

        // Получение всех модулей для удаления, связанных с указанным courseId
        List<Modules> modulesToUpdate = modulesRepository.findByCourseId(courseId);

        for (ModulesRequest moduleRequest : moduleRequests) {
            Long moduleRequestId = moduleRequest.getId();

            // Поиск модуля для удаления по moduleRequestId и courseId
            Optional<Modules> optionalModule = modulesToUpdate.stream()
                    .filter(module -> module.getId().equals(moduleRequestId))
                    .findFirst();

            if (optionalModule.isPresent()) {
                Modules modules = optionalModule.get();

                // удаление модуля
                modulesRepository.delete(modules);
            }
        }
        return new Message("delete");
    }
}
