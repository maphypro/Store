package com.jwt.security.requestResponse;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddModuleRequest {

    @Schema(description = "Идентификатор курса")
    private long courseId;

    @Schema(description = "Список модулей для добавления")
    private List<ModuleRequest> modules;
}