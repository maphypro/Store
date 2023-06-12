package com.jwt.security.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "ВОДНИК И СЛАВЕЛ",
                        email = "LOX@mail.com",
                        url = "https://spring.io"
                ),
                description = "API документация",
                title = "Какой-то тайтл",
                version = "1.0",
                license = @License(
                        name = "Лицензия",
                        url = "https://some-url.com"
                ),
                termsOfService = "Сервисы"
        ),
        servers = {
                @Server(
                        description = "Локальный сервер",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "Не локальный сервер",
                        url = "https://some-url.com"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
