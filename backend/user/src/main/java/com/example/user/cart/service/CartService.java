package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDto;
import com.example.user.user.entity.UserEntity;

public interface CartService{
    void addCart(Long productId, UserEntity userEntity);
    CartResponseDto getCart(UserEntity userEntity);
    void removeCart(Long productId,UserEntity userEntity);
}
