package com.ssafy.product.global.util;

import com.ssafy.product.product.dto.response.ProductResponseDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisUtil {
    private final int RANKING_MAX_SIZE = 7;
    private final int INCREASE = 1;
    private final String ZSET_KEY = "productRanking";
    private final RedisTemplate<String, Object> redisTemplate;
    private ZSetOperations<String, Object> zSetOps;

    @PostConstruct
    public void init() {
        this.zSetOps = redisTemplate.opsForZSet();
    }

    /**
     * 키, 값, TTL 시간 설정하여 삽입
     *
     * @param key
     * @param value
     * @param expiredTime
     */
    public void setData(String key, String value, Long expiredTime) {
        redisTemplate.opsForValue()
                .set(key, value, expiredTime, TimeUnit.MILLISECONDS);
    }

    /**
     * 키에대한 값 가져오기
     *
     * @param key
     * @return
     */
    public String getData(String key) {
        return (String) redisTemplate.opsForValue()
                .get(key);
    }

    /**
     * 키 삭제
     *
     * @param key
     */
    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    /**
     * 현재 생성되어있는 키에 값 추가하기
     *
     * @param key
     * @param value
     */
    public void appendData(String key, String value) {
        redisTemplate.opsForValue()
                .append(key, value);
    }

    /**
     * sortedSet 데이터 추가
     * @param product
     */
    public void addToSortedSet(final ProductResponseDto product) {
        // 새로운 데이터 추가 및 기존데이터 score 증가
        zSetOps.incrementScore(ZSET_KEY, product, INCREASE);

        // 현재 데이터 개수 확인
        Long size = zSetOps.zCard(ZSET_KEY);

        // 8개 초과 시 가장 낮은 점수의 데이터 삭제
        if (size != null && size > RANKING_MAX_SIZE + 1) {
            zSetOps.removeRange(ZSET_KEY, 1, 1); // 상위 8개만 유지
        }
    }

    /**
     * sortedSet 기준 상위 RANKING_MAX_SIZE 개의 데이터 조회
     */
    public Set<Object> getTopRanked() {
        return zSetOps.reverseRange(ZSET_KEY, 0, RANKING_MAX_SIZE); // 높은 점수 순으로 정렬
    }


}