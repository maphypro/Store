package com.jwt.security.requestResponse;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModulesResponse {

    private Long id;
    private Integer moduleNumber;
    private String title;
    private String description;
}
