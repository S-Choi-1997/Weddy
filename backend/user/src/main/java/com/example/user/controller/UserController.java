package com.example.user.controller;

import com.example.user.dto.APIResponse;
import com.example.user.dto.response.UserResponseDTO;
import com.example.user.entity.UserEntity;
import com.example.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

    @GetMapping("/couple-code")
    public APIResponse getCoupleCode(@AuthenticationPrincipal UserEntity user) {
        UserResponseDTO userResponseDTO = userService.coupleCode(user.getCoupleCode());
        APIResponse apiResponse = APIResponse.builder()
                .status(200)
                .data(userResponseDTO)
                .build();
        return  apiResponse;
    }

    @PatchMapping
    public APIResponse updateUser(@AuthenticationPrincipal UserEntity user) {
        APIResponse apiResponse;
        try {
            userService.patchUser(user);
            apiResponse = APIResponse.builder()
                    .status(200)
                    .message("회원 정보 수정 완료")
                    .build();
        }
        catch (Exception e) {
            apiResponse = APIResponse.builder()
                    .status(500)
                    .message("회원 정보 수정 에러")
                    .build();
        }
        return  apiResponse;
    }
}
