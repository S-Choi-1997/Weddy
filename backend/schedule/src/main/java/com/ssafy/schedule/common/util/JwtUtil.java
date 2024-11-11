package com.ssafy.schedule.common.util;

import com.ssafy.schedule.common.response.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret-key}")
    private String secretKey; // application.yml에서 주입받는 SECRET_KEY

    private Key key;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // userId 추출 메서드


    public Long extractUserId(String token) {
        Claims claims = parseClaims(token);
        return claims.get("userId", Long.class);
    }

    // code 추출 메서드
    public String extractCode(String token) {
        Claims claims = parseClaims(token);
        return claims.get("code", String.class);
    }

    // JWT Claims 파싱 메서드
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // 테스트 용도로 만료된 토큰도 허용하게 변경
            return e.getClaims(); // 만료된 토큰이라도 클레임을 반환하도록 설정
        }
        catch (JwtException e) {
            // 서명 오류 또는 다른 JWT 관련 오류 발생 시 테스트용 기본 Claims 반환
            Claims claims = Jwts.claims();
            claims.put("userId", 0L); // 기본 userId 설정
            claims.put("code", "test"); // 기본 code 설정
            return claims;
        }
    }
}