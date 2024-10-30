package com.example.user.controller;

import com.example.user.jwt.JWTUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users/reissue")  // @RequestMapping으로 경로 지정
public class TokenController {

    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;

    public TokenController(JWTUtil jwtUtil, RedisTemplate<String, String> redisTemplate) {
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
    }

    @GetMapping
    @ResponseBody
    public String reissue(){
        redisTemplate.opsForValue().set("testKey", "testValue");
        return "Token reissue endpoint called";

    }

    @GetMapping("/this")
    @ResponseBody
    public String reissue2() {
        return "Token reissue endpoint called";
    }
}
