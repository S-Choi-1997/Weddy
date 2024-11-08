package ssafy.cachescheduler.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import weddy.commonlib.constant.KeyType;
import weddy.commonlib.dto.response.ReviewResponseDto;

@Repository
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * HashSet 자료구조 사용 데이터 저장
     */
    public void addToHashSet(final KeyType keyType , final Long id, final Object object) {
        if(object instanceof ReviewResponseDto) {
            ObjectMapper objectMapper = new ObjectMapper();
            // Java 8 날짜/시간 타입 지원 모듈 등록
            objectMapper.registerModule(new JavaTimeModule());
            ReviewResponseDto review = objectMapper.convertValue(object, ReviewResponseDto.class);
            redisTemplate.opsForHash().put(keyType.name() + ":" + id, review.getId(), object);
            return;
        }
        redisTemplate.opsForHash().put(keyType.name(), id, object);
    }

}