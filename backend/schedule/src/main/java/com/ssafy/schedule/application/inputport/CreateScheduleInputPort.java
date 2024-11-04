    package com.ssafy.schedule.application.inputport;

    import com.ssafy.schedule.application.outputport.ScheduleOutPutPort;
    import com.ssafy.schedule.application.usecase.CreateScheduleUsecase;
    import com.ssafy.schedule.domain.model.Schedule;
    import com.ssafy.schedule.framework.web.dto.input.CreateScheduleInputDto;
    import com.ssafy.schedule.framework.web.dto.input.ScheduleInputDto;
    import com.ssafy.schedule.framework.web.dto.output.ScheduleOutputDto;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;


    @Service
    @Transactional
    @RequiredArgsConstructor
    public class CreateScheduleInputPort implements CreateScheduleUsecase {


        private final ScheduleOutPutPort scheduleOutPutPort;

        @Override
        public ScheduleOutputDto createSchedule(CreateScheduleInputDto createScheduleInputDto) {

            Schedule schedule =   Schedule.createSchedule(createScheduleInputDto);
            Schedule savedSchedule = scheduleOutPutPort.save(schedule);
            return createScheduleInputDto.mapToDto(savedSchedule);
        }
    }