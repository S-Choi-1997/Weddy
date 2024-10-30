package com.ssafy.product.global.util.exception;

public class SyncException extends RuntimeException{
    public SyncException() {}

    public SyncException(Long id) {
        super(id + "번 상품 동기화 실패");
    }
}
