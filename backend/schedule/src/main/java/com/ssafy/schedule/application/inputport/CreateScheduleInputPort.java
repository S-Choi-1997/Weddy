package com.ssafy.schedule.application.inputport;

import com.ssafy.schedule.application.usecase.CreateScheduleUsecase;
import com.ssafy.schedule.framework.web.dto.input.ScheduleInputDto;
import com.ssafy.schedule.framework.web.dto.output.ScheduleOutputDto;

public class CreateScheduleInputPort implements CreateScheduleUsecase {

    @Override
    public ScheduleOutputDto createSchedule(ScheduleInputDto scheduleInputDto) {
        return null;
    }
}
