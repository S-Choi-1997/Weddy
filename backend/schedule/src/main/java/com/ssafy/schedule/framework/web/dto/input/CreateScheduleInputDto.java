package com.ssafy.schedule.framework.web.dto.input;

import com.ssafy.schedule.domain.event.PaymentProductInfo;
import com.ssafy.schedule.domain.model.ContractType;
import com.ssafy.schedule.domain.model.Schedule;
import com.ssafy.schedule.framework.web.dto.output.ScheduleOutputDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CreateScheduleInputDto {

    private LocalDate startDate;
    private LocalDate endDate;
    private ContractType type;
    private String content;
    private Long productId;
    private Long userId;
    private String code;

    public static CreateScheduleInputDto  createScheduleInputDto(LocalDate startDate, LocalDate endDate, String content, Long productId, Long userId, String code) {
        return CreateScheduleInputDto.builder()
                .startDate(startDate)
                .endDate(endDate)
                .content(content)
                .productId(productId)
                .userId(userId)
                .code(code)
                .build();
    }

    public static CreateScheduleInputDto createScheduleInputDto(PaymentProductInfo paymentProductInfo)
    {
        return CreateScheduleInputDto.builder()
                .startDate((paymentProductInfo.getStartDate()))
                .endDate((paymentProductInfo.getEndDate()))
                .content(paymentProductInfo.getProduct().getProductContent())
                .productId(paymentProductInfo.getProduct().getProductId())
                .userId(paymentProductInfo.getUserId())
                .code(paymentProductInfo.getCode())
                .build();
    }

    public ScheduleOutputDto mapToDto(Schedule schedule) {
        return ScheduleOutputDto.builder()
                .id(schedule.getId())

                .contractType(schedule.getType())
                .startDate(schedule.getStartDate())
                .endDate(schedule.getEndDate())
                .content(schedule.getContent())
                .productId(schedule.getProductId())
                .code(schedule.getCode())
                .contractType(schedule.getType())
                .build();
    }

    public void updateUserInfo(Long userId, String code) {
        this.userId = userId;
        this.code = code;
    }
}