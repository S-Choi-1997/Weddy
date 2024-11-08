package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartResponseDto;
import com.example.user.cart.entity.CartEntity;
import com.example.user.cart.repository.CartRepository;
import com.example.user.user.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public void addCart(Long productId, UserEntity userEntity){
        CartEntity cartEntity = CartEntity.builder()
                .productId(productId)
                .userId(userEntity.getId())
                .build();

        cartRepository.save(cartEntity);
    }

    public void removeCart(Long productId, UserEntity userEntity){
        CartEntity cartEntity = cartRepository.findById(productId).orElse(null);
        cartRepository.delete(cartEntity);
    }

    public CartResponseDto getCart(UserEntity userEntity){
        return null;
    }
}
