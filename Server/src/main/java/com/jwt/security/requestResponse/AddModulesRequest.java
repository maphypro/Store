package com.jwt.security.requestResponse;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddModulesRequest {

    @Schema(description = "Номер модуля", required = true)
    private Integer modulesNumber;

    @Schema(description = "Название модуля", required = true)
    private String name;

    @Schema(description = "Описание модуля", required = true)
    private String description;
}