package com.example.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
public class APIResponse<T> {
    private int status;  // HTTP 상태 코드
    private T data;      // 실제 응답 데이터
}
