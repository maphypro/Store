package com.jwt.security.controller;

import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.AddModuleRequest;
import com.jwt.security.requestResponse.Message;
import com.jwt.security.requestResponse.ModulesResponse;
import com.jwt.security.service.CourseService;
import com.jwt.security.service.ModulesService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/modules")
@RequiredArgsConstructor
@Tag(name = "modules")
public class ModulesController {
    private final ModulesService modulesService;

    @PostMapping("/add_modules")
    public ResponseEntity<List<ModulesResponse>> addModules(
            @AuthenticationPrincipal User user,
            @RequestBody AddModuleRequest request
    ) {
        return ResponseEntity.ok(modulesService.addModule(request));
    }

    @GetMapping("/get_modules")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ModulesResponse>> getModules(
            @AuthenticationPrincipal User user,
            @RequestParam Long id
    ) {
        //Long id = Long.parseLong(idRequest);
        return ResponseEntity.ok(modulesService.getModules(id, user));
    }

    @PostMapping("/update_modules")
    public ResponseEntity<List<ModulesResponse>> updateModules(
            @AuthenticationPrincipal User user,
            @RequestBody AddModuleRequest request
    ) {
        return ResponseEntity.ok(modulesService.updateModules(request));
    }

    @PostMapping("/delete_modules")
    public ResponseEntity<Message> deleteModules(
            @AuthenticationPrincipal User user,
            @RequestBody AddModuleRequest request
    ) {
        return ResponseEntity.ok(modulesService.deleteModules(request));
    }
}