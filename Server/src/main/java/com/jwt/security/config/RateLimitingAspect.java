package com.jwt.security.config;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Aspect
@Component
public class RateLimitingAspect {
    private final CacheManager cacheManager;


    public RateLimitingAspect(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }


    @Around("@annotation(com.jwt.security.config.RateLimited)")
    public Object applyRateLimit(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();
        Cache cache = cacheManager.getCache("rateLimitCache");
        if (cache == null) {
            throw new IllegalStateException("Cache 'rateLimitCache' not found");
        }

        // Определение ключа кэша, основанного на имени метода
        String cacheKey = methodName;

        // Определение времени ограничения скорости (например, 1 запрос в секунду)
        Duration rateLimitDuration = Duration.ofSeconds(1);

        // Получение значения из кэша по ключу
        Cache.ValueWrapper valueWrapper = cache.get(cacheKey);

        if (valueWrapper == null) {
            // Если значение не найдено в кэше, выполняется метод и сохраняется время последнего вызова
            cache.put(cacheKey, System.currentTimeMillis());
            return joinPoint.proceed();
        } else {
            // Если значение найдено в кэше, проверяется, прошло ли достаточно времени для следующего вызова
            long lastCallTime = (long) valueWrapper.get();
            long currentTime = System.currentTimeMillis();
            long elapsedTime = currentTime - lastCallTime;

            if (elapsedTime >= rateLimitDuration.toMillis()) {
                // Если прошло достаточно времени, выполняется метод и обновляется время последнего вызова
                cache.put(cacheKey, currentTime);
                return joinPoint.proceed();
            } else {
                // Если не прошло достаточно времени, выбрасывается исключение или возвращается сообщение об ошибке
                throw new RuntimeException("Rate limit exceeded");
            }
        }
    }
}
