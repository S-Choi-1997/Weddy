package com.example.user.controller;

import com.example.user.dto.APIResponse;
import com.example.user.entity.UserEntity;
import com.example.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getUsers() {
        //APIResponse response = userService.userInfo(user.getId());
        System.out.println("1");
        return "Hello World";
    }

    @GetMapping("/test")
    public String test() {
        System.out.println("유저");
        return "test";
    }
}
