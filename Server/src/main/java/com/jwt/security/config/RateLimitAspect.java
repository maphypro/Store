package com.jwt.security.config;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.stereotype.Component;

import java.awt.image.RasterFormatException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

// ...

@Component
public class RateLimitAspect {

    private final Map<String, AtomicInteger> counterMap = new ConcurrentHashMap<>();

    @Around("@annotation(rateLimited)")
    public Object rateLimit(ProceedingJoinPoint joinPoint, RateLimited rateLimited) throws Throwable {
        String key = rateLimited.value();
        long limit = rateLimited.limit();
        double duration = rateLimited.duration(); // Изменено на double

        AtomicInteger counter = counterMap.computeIfAbsent(key, k -> new AtomicInteger());

        if (counter.incrementAndGet() > limit) {
            throw new RuntimeException("Rate limit exceeded for key: " + key);
        }

        try {
            return joinPoint.proceed();
        } finally {
            Executors.newSingleThreadScheduledExecutor()
                    .schedule(() -> counter.decrementAndGet(), (long) (duration * 1000), TimeUnit.MILLISECONDS); // Преобразование в миллисекунды
        }
    }

}

