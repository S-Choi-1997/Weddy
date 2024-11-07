package com.example.user.cart.controller;

import com.example.user.cart.dto.response.CartResponseDTO;
import com.example.user.cart.service.CartService;
import com.example.user.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/cart")
public class CartController {


    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartResponseDTO>> addCart(@RequestBody Long id){
        CartResponseDTO cartResponseDTO = cartService.addCart(id);
        return null;
    }
}
