import CategoryButton from "@/common/CategoryButton";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import DatePick from "./DatePick";
import React, { useState } from "react";
import { Schedule } from "@/apis/schedule.type";
import { schedule } from "@/apis/scheduleApi";

interface DrawerBoxProps {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerBox: React.FC<DrawerBoxProps> = ({ isOpen, onClose }) => {
  const [scheduleInfo, setScheduleInfo] = useState<Schedule>({
    startDate: null,
    endDate: null,
    content: '',
    type: '',
  });

  //== 상태 업데이트 ==//
  const updateScheduleInfo = (key: keyof Schedule, value: any) => {
    setScheduleInfo((prev) => {
      const formattedValue = (key === "startDate" || key === "endDate") && value instanceof Date ?
       value.toISOString().split("T")[0] : value;

      return { ...prev, [key]: formattedValue };
    });
  };

  //== 일정 업데이트 ==//
  const updateSchedule = async () => {
    schedule(scheduleInfo);
  };

  return (
    <Drawer shouldScaleBackground open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-gray-500">일정 추가</DrawerTitle>
          <DrawerDescription>
            <DatePick title="시작일" changeDate={(date) => updateScheduleInfo("startDate", date)} />
            <DatePick title="종료일" changeDate={(date) => updateScheduleInfo("endDate", date)} />
          </DrawerDescription>
          <DrawerDescription>
            <input
              type="text"
              placeholder="일정을 입력하세요."
              className="w-[320px] border rounded-md p-3 my-2"
              onChange={(e) => updateScheduleInfo("content", e.target.value)}
            />
            <CategoryButton changeCategory={(category) => updateScheduleInfo("type", category)} />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={updateSchedule}>추가</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBox;