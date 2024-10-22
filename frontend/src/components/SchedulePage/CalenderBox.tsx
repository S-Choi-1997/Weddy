import { useState } from "react";
import { Calendar } from "../ui/calendar";
import DrawerBox from "./DrawerBox";

const CalenderBox = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex justify-center w-full mt-12">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          setDate(date ?? new Date());
          setIsDrawerOpen(true);
        }}
        className="rounded-md border shadow"
      />
      <DrawerBox isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default CalenderBox;
