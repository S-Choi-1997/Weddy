// import CategoryButton from "@/common/CategoryButton";
import CalenderBox from "../components/SchedulePage/CalenderBox";
import ScheduleBox from "../components/SchedulePage/ScheduleBox";
import PlusIcon from "../icons/PlusIcon";
import { AlertDialogDemo } from "../components/SchedulePage/DrawerBox";
import { useState } from "react";

// import { useQuery } from "react-query";
// import { getSchedule } from "@/apis/scheduleApi";

const Schedule = () => {
  // const { data:schedulList } = useQuery('getSchedule', getSchedule);

  const selectCategory = (category: string) => {
    console.log(category);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div className="m-5 flex flex-col">
      <CalenderBox onDateChange={handleDateChange}/>
      <div className="my-5 mx-3 font-bold">
        {selectedDate.toLocaleDateString("ko-KR", {
          weekday: "long",
          day: "numeric",
        })}
      </div>
      {/* <div className="my-5 flex justify-center">
        <CategoryButton changeCategory={selectCategory} />
      </div> */}
      <div></div>
      <ScheduleBox type="studio" title="스튜디오 촬영" />
      <ScheduleBox type="dress" title="드레스 피팅"/>
      <ScheduleBox type="makeup" title="메이크업" />
      <ScheduleBox type="etc" title="일정이 없습니다." />

      <div onClick={() => { setIsOpen(true); }} className="plusIconButton">
        <PlusIcon />
      </div>
        <AlertDialogDemo isOpen={isOpen} onClose={handleCloseDialog} />

    </div>
  )
}

export default Schedule;