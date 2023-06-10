package com.jwt.security.exception;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DataIntegrityViolationAspect {

    @Around("execution(* your.package.*.*(..)) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object handleDataIntegrityViolationException(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            return joinPoint.proceed();
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = "Ошибка уникальности поля: " + ex.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }
}
