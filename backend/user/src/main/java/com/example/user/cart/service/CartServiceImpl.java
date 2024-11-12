package com.example.user.cart.service;

import com.example.user.cart.dto.response.CartProductDto;
import com.example.user.cart.entity.CartEntity;
import com.example.user.cart.repository.CartRepository;
import com.example.user.common.config.KafkaTopicProperties;
import com.example.user.common.dto.ErrorCode;
import com.example.user.common.exception.CartNotFoundException;
import com.example.user.common.exception.ConflictItemsException;
import com.example.user.user.entity.UserEntity;
import com.example.user.user.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.*;

@Service
@Slf4j
public class CartServiceImpl implements CartService {


    private final CartRepository cartRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final KafkaTopicProperties kafkaTopicProperties;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserRepository userRepository;
    private ConcurrentHashMap<String, CompletableFuture<List<CartProductDto>>> pendingRequests = new ConcurrentHashMap<>();


    public CartServiceImpl(CartRepository cartRepository, KafkaTemplate<String, Object> kafkaTemplate, KafkaTopicProperties kafkaTopicProperties, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.kafkaTopicProperties = kafkaTopicProperties;
        this.userRepository = userRepository;
    }

    public void addCart(Long productId, UserEntity userEntity){
        if (cartRepository.existsByCoupleCodeAndProductId(userEntity.getCoupleCode(), productId)) {
            throw new ConflictItemsException(ErrorCode.ITEM_NOT_FOUND);
        }
        CartEntity cartEntity = CartEntity.builder()
                .productId(productId)
                .coupleCode(userEntity.getCoupleCode())
                .build();

        cartRepository.save(cartEntity);
    }

    public void removeCart(Long productId, UserEntity userEntity){
        List<CartEntity> cartEntities = cartRepository.findByCoupleCode(userEntity.getCoupleCode());
        if (cartEntities != null && !cartEntities.isEmpty()) {
            cartRepository.deleteAll(cartEntities);
        }
        else throw new CartNotFoundException(ErrorCode.ITEM_NOT_FOUND);
    }

    public List<CartProductDto> getCart(UserEntity userEntity) {
        try {
            // 1. 상품 ID 목록을 가져옵니다.
            List<Long> productIds = cartRepository.findAllProductIdByUserId(userEntity.getCoupleCode());

            // 2. 고유한 요청 ID를 생성합니다. 이를 통해 요청과 응답을 매칭할 수 있습니다.
            String correlationId = "cart-request-" + userEntity.getCoupleCode();

            // 3. CompletableFuture 생성: 나중에 응답이 올 때까지 기다릴 수 있게 준비합니다.
            CompletableFuture<List<CartProductDto>> future = new CompletableFuture<>();

            // 4. 이 요청을 추적할 수 있도록 pendingRequests에 저장합니다.
            pendingRequests.put(correlationId, future);

            // 5. Kafka에 요청 전송 (productIds 목록을 JSON으로 직렬화하여 전송)
            String jsonRequest = objectMapper.writeValueAsString(productIds);
            log.info("로그 출력:{}",jsonRequest);
            String topic = kafkaTopicProperties.getCartRequestTopic().getName();
            kafkaTemplate.send(topic, correlationId, jsonRequest);

            // 6. 응답 대기: 5초 동안 응답을 기다립니다.
            List<CartProductDto> response = future.get(5, TimeUnit.SECONDS);

            // 7. 응답을 받은 후 요청 목록에서 제거하고 응답을 반환합니다.
            pendingRequests.remove(correlationId);
            return response;

        } catch (Exception e) {

            throw new CartNotFoundException(ErrorCode.ITEM_NOT_FOUND);
        }
//        return null; // 오류 발생 시 null 반환
    }




    @KafkaListener(topics = "#{@kafkaTopicProperties.cartResponseTopic.name}", groupId = "cart-response-group")
    public void onResponseReceived(
            @Header(KafkaHeaders.RECEIVED_KEY) String correlationId, // Key를 Header로 받아옴
            Object message
    ) {
        String jsonResponse = message.toString();
        log.info("correlationId : {}, jsonResponse : {}", correlationId, jsonResponse);
        CompletableFuture<List<CartProductDto>> future = pendingRequests.get(correlationId);
        log.info("들어옴?{}", future == null ? "no" : "yes");

        if (future != null) {
            try {
                // JSON 문자열을 List<CartResponseDto>로 변환
                List<CartProductDto> responseList = objectMapper.readValue(
                        jsonResponse,
                        new TypeReference<List<CartProductDto>>() {} // List 타입을 명확하게 지정
                );
                log.info("받은 로그 출력{}", responseList);
                future.complete(responseList);
            } catch (Exception e) {
                future.completeExceptionally(e);
            }
        }
    }


}

