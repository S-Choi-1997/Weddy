package com.example.user.service;

import com.example.user.dto.APIResponse;
import com.example.user.dto.UserDTO;
import com.example.user.dto.response.UserResponseDTO;
import com.example.user.entity.UserEntity;
import com.example.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public APIResponse<UserEntity> userInfo(Long userId){
        APIResponse response = APIResponse.builder()
                .status(200)
                .data(userRepository.findById(userId)
                        .orElseThrow(()->new RuntimeException("user not found")))
                .build();
        return response;
    }

    public UserResponseDTO coupleCode(String coupleCode){
        UserResponseDTO userResponseDTO = UserResponseDTO.builder()
                .coupleCode(coupleCode)
                .build();

        return userResponseDTO;
    }
}
