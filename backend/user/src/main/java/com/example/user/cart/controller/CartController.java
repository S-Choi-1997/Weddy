package com.example.user.cart.controller;

import com.example.user.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/cart")
public class CartController {


    @PostMapping("/add")
    public ResponseEntity<ApiResponse<>>
}
