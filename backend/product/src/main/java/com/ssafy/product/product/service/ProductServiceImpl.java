package com.ssafy.product.product.service;

import com.ssafy.product.product.domain.Product;
import com.ssafy.product.product.domain.ProductImage;
import com.ssafy.product.product.dto.request.ProductRegistRequestDto;
import com.ssafy.product.product.dto.response.ProductImageResponseDto;
import com.ssafy.product.product.dto.response.ProductResponseDto;
import com.ssafy.product.product.repository.ProductImageRepository;
import com.ssafy.product.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    @Override
    public List<ProductResponseDto> getList() {
        return productRepository.findAll().stream()
                .map(product -> product.getProduct(product))
                .toList();
    }

    @Override
    public ProductResponseDto detailProduct(final Long productId) {
        return productRepository.findById(productId)
                .map(product -> product.getProduct(product))
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public ProductResponseDto registProduct(ProductRegistRequestDto productRegistRequestDto) {
        return null;
    }
}