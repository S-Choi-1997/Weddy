package com.example.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
public class UserResponseDTO {
    private Long id;
    private String code;
    private String name;
    private String socialId;
    private String adress;
    private String phone;
}
