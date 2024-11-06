package com.ssafy.schedule.framework.kafkaadapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleEventProducer {
    @Value("${producers.topic1.name}")
    private String TOPIC;




}