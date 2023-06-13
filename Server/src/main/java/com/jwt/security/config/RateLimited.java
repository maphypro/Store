package com.jwt.security.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RateLimited {
    String value() default ""; // Ключ для идентификации лимита
    long limit() default 10; // Максимальное количество вызовов
    double duration() default 0.2; // Длительность в секундах
}
