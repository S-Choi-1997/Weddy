package com.example.user.dto;

import lombok.*;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String coupleCode;
    private String name;
    private String socialId;
    private String adress;
    private String phone;
}