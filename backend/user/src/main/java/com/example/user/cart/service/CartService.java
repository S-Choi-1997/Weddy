package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDTO;
import com.example.user.user.entity.UserEntity;

public interface CartService{
    CartResponseDTO addCart(Long productId, UserEntity userEntity);
}
