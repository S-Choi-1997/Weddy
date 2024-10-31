package com.example.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class APIResponse<T> {
    private int status;  // HTTP 상태 코드
    private T data;      // 실제 응답 데이터

    public APIResponse(int status, T data) {
        this.status = status;
        this.data = data;
    }
    private APIResponse(Builder<T> builder) {
        this.status = builder.status;
        this.data = builder.data;
    }

    public static class Builder<T>{
        private int status;
        private T data;
        public Builder<T> status(int status){
            this.status = status;
            return this;
        }
        public Builder<T> data(T data){
            this.data = data;
            return this;
        }
        public APIResponse<T> build(){
            return new APIResponse<T>(this);
        }
    }
}
