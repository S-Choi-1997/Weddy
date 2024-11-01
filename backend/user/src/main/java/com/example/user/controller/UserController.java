package com.example.user.controller;

import com.example.user.dto.APIResponse;
import com.example.user.dto.response.UserResponseDTO;
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
    public APIResponse getUsers(@AuthenticationPrincipal UserEntity user) {
        APIResponse response = userService.userInfo(user.getId());
        return response;
    }

    @GetMapping("/users/couple-code")
    public APIResponse getCoupleCode(@AuthenticationPrincipal UserEntity user) {
        UserResponseDTO userResponseDTO = userService.coupleCode(user.getCode());
        APIResponse apiResponse = APIResponse.builder()
                .status(200)
                .data(userResponseDTO)
                .build();
    }
}
