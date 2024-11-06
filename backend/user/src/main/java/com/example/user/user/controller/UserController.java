package com.example.user.user.controller;

import com.example.user.common.dto.APIResponse;
import com.example.user.common.dto.UserDTO;
import com.example.user.user.dto.response.UserResponseDTO;
import com.example.user.user.entity.UserEntity;
import com.example.user.security.jwt.BlackTokenService;
import com.example.user.user.repository.UserRepository;
import com.example.user.security.service.TokenService;
import com.example.user.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final BlackTokenService blackTokenService;
    private final UserRepository userRepository;

    public UserController(UserService userService, TokenService tokenService, BlackTokenService blackTokenService, UserRepository userRepository) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.blackTokenService = blackTokenService;
        this.userRepository = userRepository;
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

//    @PatchMapping
//    public APIResponse updateUser(@AuthenticationPrincipal UserEntity user) {
//        APIResponse apiResponse;
//        try {
//            userService.patchUser(user);
//            apiResponse = APIResponse.builder()
//                    .status(200)
//                    .message("회원 정보 수정 완료")
//                    .build();
//        }
//        catch (Exception e) {
//            apiResponse = APIResponse.builder()
//                    .status(500)
//                    .message("회원 정보 수정 에러")
//                    .build();
//        }
//        return  apiResponse;
//    }

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
    public APIResponse updateUser(@AuthenticationPrincipal UserEntity user,
                                  @RequestParam(required = false) String phone,
                                  @RequestParam(required = false) String name,
                                  @RequestParam(required = false) String address,
                                  @RequestParam(required = false) String email,
                                  @RequestParam(required = false) String date,
                                  @RequestParam(required = false) MultipartFile picture) {
        try {
            Map<String, Object> updates = new HashMap<>();
            if (phone != null) updates.put("phone", phone);
            if (name != null) updates.put("name", name);
            if (address != null) updates.put("address", address);
            if (email != null) updates.put("email", email);
            if (date != null) updates.put("Date", date);
            if (picture != null) updates.put("picture", picture);

            userService.updateUserInfo(user.getId(), updates);
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
        UserDTO userDTO;
        try {
            userDTO = userService.connectCoupleCode(code,user.getId());
            return APIResponse.builder()
                    .status(200)
                    .message("커플코드 수정 완료")
                    .data(userDTO)
                    .build();
        } catch (Exception e) {
            return APIResponse.builder()
                    .status(500)
                    .message("커플코드 수정 에러")
                    .build();
        }
    }

    @GetMapping("/test")
    public APIResponse test(@AuthenticationPrincipal UserEntity user) {
        try {
            return APIResponse.builder()
                    .data(user)
                    .build();
        }catch (Exception e){
            return APIResponse.builder()
                    .status(500)
                    .message("에러")
                    .build();
        }
    }
}