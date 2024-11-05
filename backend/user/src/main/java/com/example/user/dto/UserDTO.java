package com.example.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    private String coupleCode;
    private String name;
    private String socialId;
    private String adress;
    private String phone;
    private String picture;
}