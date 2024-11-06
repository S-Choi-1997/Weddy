package com.ssafy.schedule.framework.kafkaadapter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.schedule.application.usecase.CreateScheduleUsecase;
import com.ssafy.schedule.domain.event.EventResult;
import com.ssafy.schedule.domain.event.EventType;
import com.ssafy.schedule.domain.event.PaymentProductInfo;
import com.ssafy.schedule.framework.web.dto.input.CreateScheduleInputDto;
import com.ssafy.schedule.framework.web.dto.output.ScheduleOutputDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 *
 * @ 작성자   : 이병수
 * @ 작성일   : 2024-10-29
 * @ 설명     : 카프카 이벤트 받는 컨슈머
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleConsumers {

    private final ObjectMapper objectMapper ;
    private final CreateScheduleUsecase createScheduleUsecase;

    private final ScheduleEventProducer eventProducer;

    @KafkaListener(topics = "${consumer.topic1.name}",groupId = "${consumer.groupid.name}")
    public void paymentProduct(ConsumerRecord<String, String> record) throws IOException {

        PaymentProductInfo paymentProductInfo = objectMapper.readValue(record.value(), PaymentProductInfo.class);
        EventResult eventResult = EventResult.createEventResult(paymentProductInfo);
        try{

            log.info("뭐가 되는거지? "+ record.value());



            log.info(paymentProductInfo.toString());
            //prododcut로 일정 생성
            CreateScheduleInputDto dto = CreateScheduleInputDto.createScheduleInputDto(paymentProductInfo);
            // UseCase를 통해 일정 생성
            createScheduleUsecase.createSchedule(dto);

            // 성공 시 이벤트 발생
            eventResult.updateIsSuccess(true);

        }
        catch(Exception e){
            eventResult.updateIsSuccess(false);

        }
//        eventProducer.occurEvent(event);





    }


}

