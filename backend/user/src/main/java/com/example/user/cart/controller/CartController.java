package com.example.user.cart.controller;

import com.example.user.cart.dto.response.CartProductDto;
import com.example.user.cart.dto.response.CartResponseDto;
import com.example.user.cart.service.CartService;
import com.example.user.common.dto.ApiResponse;
import com.example.user.user.entity.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/cart")
public class CartController {


    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<ApiResponse<String>> addCart(@PathVariable Long productId, @AuthenticationPrincipal UserEntity user) {
        cartService.addCart(productId, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("카트 추가 성공"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartProductDto>>> getCart(@AuthenticationPrincipal UserEntity user){
        List<CartProductDto> cartProductDto = cartService.getCart(user);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(cartProductDto,"카트 조회 성공"));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<ApiResponse<String>> deleteCart(@PathVariable Long productId, @AuthenticationPrincipal UserEntity user){
        cartService.removeCart(productId,user);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("카트 제거 성공"));
    }

}
