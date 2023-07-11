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
public class ModulesRequest {

    @Schema(description = "Идентификатор модуля", required = true)
    private Long id;

    @Schema(description = "Номер модуля", required = true)
    private Double moduleNumber;

    @Schema(description = "Название модуля", required = true)
    private String title;

    @Schema(description = "Описание модуля", required = true)
    private String description;
    private Integer code;
}