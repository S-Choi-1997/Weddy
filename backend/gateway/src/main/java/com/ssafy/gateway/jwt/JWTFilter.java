package com.ssafy.gateway.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class JWTFilter implements WebFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getPath().value();
        String method = exchange.getRequest().getMethod().name();
        log.info("[요청 경로]: {}, [HTTP 메서드]: {}", path, method);

        // OPTIONS 요청은 무시
        if ("OPTIONS".equalsIgnoreCase(method)) {
            log.info("[JWTFilter] OPTIONS 요청입니다. 필터를 통과합니다.");
            return chain.filter(exchange);
        }

        // Authorization 헤더 확인
        String authorization = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            log.warn("[JWTFilter] Authorization 헤더가 없거나 올바르지 않은 형식입니다.");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // 토큰 검증
        String token = authorization.substring(7); // "Bearer " 제거
        if (jwtUtil.isExpired(token)) {
            log.warn("[JWTFilter] JWT 토큰이 만료되었습니다.");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        log.info("[JWTFilter] JWT 토큰 검증 완료. 요청을 필터 체인으로 전달합니다.");
        return chain.filter(exchange);
    }
}
