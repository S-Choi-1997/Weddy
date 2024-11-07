package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDTO;

public interface CartService{
    CartResponseDTO addCart(Long productId);
}
