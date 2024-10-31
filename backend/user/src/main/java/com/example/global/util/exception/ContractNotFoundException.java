package com.example.global.util.exception;

import com.example.global.util.response.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class ContractNotFoundException extends RuntimeException {

    private final ErrorCode errorCode;
    public ContractNotFoundException(ErrorCode errorCode ){
        super(errorCode.getMessage()); // 에러 코드의 메시지를 기본 메시지로 설정
        this.errorCode = errorCode;
    }
}
