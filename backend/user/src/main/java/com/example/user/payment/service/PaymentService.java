package com.example.user.payment.service;


import com.example.user.contract.dto.response.ContractResponseDto;
import com.example.user.contract.service.ContractService;
import com.example.user.payment.dto.request.ContractInfoRequestDto;
import com.example.user.payment.dto.request.PaymentProductInfo;
import io.jsonwebtoken.Header;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.header.Headers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    @Value(value = "${portone.api-key}")
    private String API_SECRET_KEY;
    @Value(value = "${portone.store-id}")
    private String STORE_ID;
    @Value(value = "${producers.topic1.name}")
    private String TOPIC_PAYMENT;

    private final KafkaTemplate<String ,PaymentProductInfo> kafkaTemplate;
    private final ContractService contractService;
    /**
     * 결제 성공 후 게약서 상태 정보 변경 및 카프카를 통해 일정 자동 등록 이벤트 발생
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-11-04
     * @ 설명     :결제 성공 후 게약서 상태 정보 변경 및 카프카를 통해 일정 자동 등록 이벤트 발생
     * @param contractInfoRequestDto
     */
    public void paymentSuccess(ContractInfoRequestDto contractInfoRequestDto) {
        contractService.changeContractStatus(contractInfoRequestDto.getId());
        occurPaymentEvent(contractInfoRequestDto);

        String reason = "일정 생성 오류 ";
        paymentCancel(contractInfoRequestDto.getPaymentId(), reason);
    }

    public void paymentCancel(String paymentId, String reason) {
        // 결제 취소 로직

        RestTemplate restTemplate = new RestTemplate();

        String url =  "https://api.portone.io/payments/"+paymentId+"/cancel";
        HttpHeaders headers  = new HttpHeaders();
        headers.add("Authorization", API_SECRET_KEY);
        HttpEntity<String > entity = new HttpEntity<>(headers);

        ResponseEntity<String> response  =  restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
        );

        if(response.getStatusCode().is2xxSuccessful()){
            log.info("결제 취소 성공");
        }else{
            log.info("결제 취소 실패");
        }
    }



    /**
     * 일정 등록 이벤트 발생
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-11-05
     * @ 설명     :

     * @param contractInfoRequestDto
     */
    public void occurPaymentEvent(ContractInfoRequestDto contractInfoRequestDto)  {
        PaymentProductInfo paymentProductInfo = createPaymentProductInfo(contractInfoRequestDto);

        CompletableFuture<SendResult<String, PaymentProductInfo>> send = kafkaTemplate.send(TOPIC_PAYMENT, paymentProductInfo);
        send.whenComplete((sendResult,ex)->{
            if(ex!=null){

                log.info("결제 실패 하였습니다. 보상함수를 실행합니다."+ ex.getMessage());

                // 보상함수 실행 ;
                // 결제 보상;
            }else{
                PaymentProductInfo value = (PaymentProductInfo) sendResult.getProducerRecord().value();
                log.info("이벤트 처리완료");


            }
        });
    }

    private PaymentProductInfo createPaymentProductInfo(ContractInfoRequestDto contractInfoRequestDto) {
        return PaymentProductInfo.builder()
                .id(contractInfoRequestDto.getId())
                .title(contractInfoRequestDto.getTitle())
                .content(contractInfoRequestDto.getContent())
                .status(contractInfoRequestDto.getStatus())
                .userId(contractInfoRequestDto.getUserId())
                .code(contractInfoRequestDto.getCode())
                .userName(contractInfoRequestDto.getUserName())
                .totalMount(contractInfoRequestDto.getTotalMount())
                .companyName(contractInfoRequestDto.getCompanyName())
                .additionalTerms(contractInfoRequestDto.getAdditionalTerms())
                .startDate(contractInfoRequestDto.getStartDate())
                .endDate(contractInfoRequestDto.getEndDate())
                .product(contractInfoRequestDto.getProduct())
                .build();
    }

}
