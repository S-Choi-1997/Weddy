import CalenderBox from "../components/SchedulePage/CalenderBox";
import ScheduleBox from "../components/SchedulePage/ScheduleBox";
import PlusIcon from "../icons/PlusIcon";
import { AlertDialogDemo } from "../components/SchedulePage/DrawerBox";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSchedule } from "@/apis/scheduleApi";
import { GetSchedule } from "@/apis/schedule.type";

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());
  const [ filteredList, setFilteredList ] = useState<GetSchedule[]>([]);
  console.log(selectedDate.toISOString());

  const { data: scheduleList } = useQuery(
    ['getSchedule', selectedDate.toISOString()],
    () => getSchedule(selectedDate.toISOString()),
    { enabled: !!selectedDate.toISOString()}
  );

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  //== 해당 날짜의 스케줄 ==//
  useEffect(() => {
    const update = async () => {
      const data = scheduleList?.filter((schedule: GetSchedule) => schedule.startDate <= selectedDate && schedule.endDate >= selectedDate);
      if (data) {
        setFilteredList(data);
      }
    };
    update();
  }, [selectedDate]);

  return (
    <div className="m-5 flex flex-col">
      <CalenderBox onDateChange={handleDateChange}/>
      <div className="my-5 mx-3 font-bold">
        {selectedDate.toLocaleDateString("ko-KR", {
          weekday: "long",
          day: "numeric",
        })}
      </div>

      <div></div>
      {/* <ScheduleBox type="studio" title="스튜디오 촬영" />
      <ScheduleBox type="dress" title="드레스 피팅"/>
      <ScheduleBox type="makeup" title="메이크업" />
      <ScheduleBox type="etc" title="일정이 없습니다." /> */}

      {filteredList.length <= 0 ? (
        <ScheduleBox type="etc" title="일정이 없습니다." /> 
      ) : (
        filteredList.map((schedule: GetSchedule) => {
          switch (schedule.product.type) {
            case 'studio':
              return <ScheduleBox key={schedule.id} type="studio" title="스튜디오 촬영" />;
            case 'dress':
              return <ScheduleBox key={schedule.id} type="dress" title="드레스 피팅" />;
            case 'makeup':
              return <ScheduleBox key={schedule.id} type="makeup" title="메이크업" />;
            default:
              return <ScheduleBox key={schedule.id} type="etc" title="기타 일정" />;
          }
        })
      )}

      <div onClick={() => { setIsOpen(true); }} className="plusIconButton">
        <PlusIcon />
      </div>

        <AlertDialogDemo isOpen={isOpen} onClose={handleCloseDialog} />
    </div>
  )
}

export default Schedule;