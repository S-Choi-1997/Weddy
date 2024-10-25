import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { AlertDialogDemo } from "./DrawerBox";
// import DrawerBox from "./DrawerBox";

const CalenderBox = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false); // 다이얼로그를 닫는 함수
  };


  return (
    <div className="flex justify-center w-full mt-12">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          setDate(date ?? new Date());
          // setIsDrawerOpen(true);
          setIsOpen(true);
        }}
        className="rounded-md border shadow"
      />
      <AlertDialogDemo isOpen={isOpen} onClose={handleCloseDialog}/>
      {/* <DrawerBox isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
    </div>
  );
};

export default CalenderBox;
