import { GetSchedule } from "@/api/schedule.type";
import { getSchedule } from "@/api/scheduleApi";
import { useState } from "react";
import { useQuery } from "react-query";
import CalenderBox from "../components/SchedulePage/CalenderBox";
import { AlertDialogDemo } from "../components/SchedulePage/DrawerBox";
import ScheduleBox from "../components/SchedulePage/ScheduleBox";
import PlusIcon from "../icons/PlusIcon";

const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());

  const { data: scheduleList } = useQuery(
    ['getSchedule', selectedDate.toISOString().slice(0, 10)],
    () => getSchedule(selectedDate.toISOString().slice(0, 10)),
    { enabled: !!selectedDate.toISOString().slice(0, 10)}
  );

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="m-5 flex flex-col">
      <CalenderBox onDateChange={handleDateChange} />
      <div className="my-5 mx-3 font-bold">
        {selectedDate.toLocaleDateString("ko-KR", {
          weekday: "long",
          day: "numeric",
        })}
      </div>

      <div></div>

      {!scheduleList || scheduleList?.length <= 0 ? (
        <ScheduleBox type="etc" title="일정이 없습니다." />
      ) : (
        scheduleList?.map((schedule: GetSchedule) => {
          switch (schedule.contractType) {
            case 'STUDIO':
              return <ScheduleBox key={schedule.id} type="studio" title={schedule.content} />;
            
            case 'DRESS':
              return <ScheduleBox key={schedule.id} type="dress" title="드레스 피팅" />;

            case 'MAKEUP':
              return <ScheduleBox key={schedule.id} type="makeup" title="메이크업" />;

            default:
              return <ScheduleBox key={schedule.id} type="etc" title={schedule.content} />;
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