package com.ssafy.product.product.service;

import com.ssafy.product.product.dto.response.ProductResponseDto;

public interface SyncService {
    void syncToReadDatabaseAsync(final ProductResponseDto productResponseDto);
    void recover(final Exception e);
}
