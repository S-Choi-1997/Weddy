package com.ssafy.schedule.framework.jpaadapter;

import com.ssafy.schedule.application.outputport.ScheduleOutPutPort;
import com.ssafy.schedule.domain.model.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 작성자   : user
 * 작성날짜 : 2024-10-26
 * 설명    :
 */

@Repository
@RequiredArgsConstructor
public class ScheduleJpaAdapter implements ScheduleOutPutPort {

    private final ScheduleRepository scheduleRepository;


    @Override
    public Optional<List<Schedule>> getSchedules(String coupleCode) {
        return scheduleRepository.findByCode(coupleCode);
    }

    @Override
    public Optional<Schedule> getSchedule(Long scheduleId) {
        return scheduleRepository.findById(scheduleId);
    }

    @Override
    public Schedule save(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}
