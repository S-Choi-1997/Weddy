package com.example.user.service;

import com.example.user.dto.APIResponse;
import com.example.user.dto.UserDTO;
import com.example.user.dto.response.UserResponseDTO;
import com.example.user.entity.UserEntity;
import com.example.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

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

//    public void patchUser(UserEntity userEntity){
//        userRepository.save(userEntity);
//    }



    public void updateUserInfo(Long id, Map<String, Object> info) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);

        if (userEntity == null) {
            throw new RuntimeException("User not found");
        }

        if (info.get("phone") != null && !info.get("phone").toString().trim().isEmpty()) {
            userEntity.setPhone(info.get("phone").toString());
        }

        if (info.get("name") != null && !info.get("name").toString().trim().isEmpty()) {
            userEntity.setName(info.get("name").toString());
        }

        if (info.get("address") != null && !info.get("address").toString().trim().isEmpty()) {
            userEntity.setAddress(info.get("address").toString());
        }

        if (info.get("email") != null && !info.get("email").toString().trim().isEmpty()) {
            userEntity.setEmail(info.get("email").toString());
        }

        if (info.get("picture") != null && !info.get("picture").toString().trim().isEmpty()) {
            userEntity.setPicture(info.get("picture").toString());
        }

        if (info.get("Date") != null && !info.get("Date").toString().trim().isEmpty()) {
            userEntity.setDate(LocalDate.parse(info.get("Date").toString()));
        }

        userRepository.save(userEntity);
    }


    public UserDTO connectCoupleCode(String coupleCode,Long id){
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        assert userEntity != null;
        userEntity.setCoupleCode(coupleCode);
        userRepository.save(userEntity);
        return UserDTO.builder()
                .name(userEntity.getName())
                .picture(userEntity.getPicture())
                .build();
    }
}
