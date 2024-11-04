package com.example.user.controller;

import com.example.user.dto.APIResponse;
import com.example.user.dto.response.UserResponseDTO;
import com.example.user.entity.UserEntity;
import com.example.user.jwt.BlackTokenService;
import com.example.user.service.TokenService;
import com.example.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final BlackTokenService blackTokenService;

    public UserController(UserService userService, TokenService tokenService, BlackTokenService blackTokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.blackTokenService = blackTokenService;
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

    @PostMapping("/logout")
    public APIResponse logoutUser (@AuthenticationPrincipal UserEntity user,@RequestHeader("Authorization") String authorizationHeader) {
        APIResponse apiResponse;
        String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7) : authorizationHeader;
        try {
            blackTokenService.addToBlacklist(token,user.getId());
            apiResponse = APIResponse.builder()
                    .status(200)
                    .message("로그아웃 완료")
                    .build();
        }
        catch (Exception e) {
            apiResponse = APIResponse.builder()
                    .status(500)
                    .message("로그아웃 에러")
                    .build();
        }
        return apiResponse;
    }

    @PatchMapping
    public APIResponse updateUser(@AuthenticationPrincipal UserEntity user, @RequestBody Map<String, String> updates) {
        String phone = updates.get("phone");
        String name = updates.get("name");
        String address = updates.get("address");

        try {
            userService.updateUserInfo(user.getId(), phone, name, address);
            return APIResponse.builder()
                    .status(200)
                    .message("회원 정보 수정 완료")
                    .build();
        } catch (Exception e) {
            return APIResponse.builder()
                    .status(500)
                    .message("회원 정보 수정 에러")
                    .build();
        }
    }

    @PatchMapping("/couple-connect")
    public APIResponse connectCouple(@AuthenticationPrincipal UserEntity user, @RequestBody Map<String, String> codeRequest) {
        String code = codeRequest.get("code");
        try {
            userService.patchCoupleCode(code,user.getId());
            return APIResponse.builder()
                    .status(200)
                    .message("커플코드 수정 완료")
                    .build();
        } catch (Exception e) {
            return APIResponse.builder()
                    .status(500)
                    .message("커플코드 수정 에러")
                    .build();
        }
    }
}
