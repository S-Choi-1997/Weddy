package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDto;
import com.example.user.user.entity.UserEntity;

public interface CartService{
    CartResponseDto addCart(Long productId, UserEntity userEntity);
}
