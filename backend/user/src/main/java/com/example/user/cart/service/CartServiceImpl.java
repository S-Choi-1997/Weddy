package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDto;
import com.example.user.user.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    public CartServiceImpl() {

    }
    public CartResponseDto addCart(Long productId, UserEntity userEntity){
        return null;
    }
}
