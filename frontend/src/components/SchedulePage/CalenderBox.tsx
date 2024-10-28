import { useState } from "react";
import { Calendar } from "../ui/calendar";

interface CalenderBoxProps {
  onDateChange: (date: Date) => void;
}

const CalenderBox = ({ onDateChange }: CalenderBoxProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const handleSelect = (selectedDate: Date | undefined) => {
    const newDate = selectedDate ?? new Date();
    setDate(newDate);
    onDateChange(newDate); // 부모 컴포넌트로 날짜 전달
  };

  return (
    <div className="flex justify-center w-full mt-12">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="rounded-md border shadow"
      />
    </div>
  );
};

export default CalenderBox;
