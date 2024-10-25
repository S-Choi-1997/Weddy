package com.ssafy.product.product.controller;

import com.ssafy.product.product.dto.response.ProductResponseDto;
import com.ssafy.product.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.getList());
    }
    @GetMapping("/{product_id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable("product_id") Long productId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.detailProduct(productId));
    }

}