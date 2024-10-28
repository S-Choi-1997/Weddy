package com.ssafy.product.product.controller;

import com.ssafy.product.product.dto.request.ProductRegistRequestDto;
import com.ssafy.product.product.dto.request.ReviewRequestDto;
import com.ssafy.product.product.dto.response.ProductResponseDto;
import com.ssafy.product.product.dto.response.ReviewResponseDto;
import com.ssafy.product.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping
    public ResponseEntity<ProductResponseDto> registProduct(@RequestPart ProductRegistRequestDto registRequestDto, @RequestPart List<MultipartFile> images){
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.registProduct(registRequestDto, images));
    }

    @GetMapping("/{product_id}/review")
    public ResponseEntity<List<ReviewResponseDto>> getReviewByProductId(@PathVariable("product_id") Long productId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.reviewList(productId));

    }

    @PostMapping("/{product_id}/review")
    public ResponseEntity<ReviewResponseDto> registReviewByProductId(@RequestBody ReviewRequestDto reviewRequestDto, @PathVariable("product_id") Long productId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.registerReview(reviewRequestDto,productId));

    }

}
