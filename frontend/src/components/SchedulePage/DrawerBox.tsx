import { Schedule } from "@/api/schedule.type";
import { schedule } from "@/api/scheduleApi";
import CategoryButton from "@/common/CategoryButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import styled from "styled-components";
import DatePick from "./DatePick";

interface AlertDialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlexCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export function AlertDialogDemo({ isOpen, onClose }: AlertDialogDemoProps) {
  const [scheduleInfo, setScheduleInfo] = useState<Schedule>({
    startDate: null,
    endDate: null,
    content: '',
    contractType: '',
    productId: '',
  });

  const updateScheduleInfo = (key: keyof Schedule, value: any) => {
    setScheduleInfo((prev) => {
      const formattedValue =
        (key === "startDate" || key === "endDate") && value instanceof Date
          ? value.toISOString().slice(0, 19)
          : value;

      return { ...prev, [key]: formattedValue };
    });
  };



  const updateSchedule = async () => {
    await schedule(scheduleInfo);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>일정 추가</AlertDialogTitle>
          <AlertDialogDescription>
            <DatePick
              type="start"
              title="시작일"
              changeDate={(date) => updateScheduleInfo("startDate", date)}
            />
            <DatePick
              type="end"
              title="종료일"
              changeDate={(date) => updateScheduleInfo("endDate", date)}
            />
          </AlertDialogDescription>
          <FlexCenterWrapper>
            <input
              type="text"
              placeholder="일정을 입력하세요."
              className="w-[320px] border rounded-md p-3 my-2 text-[16px]"
              onChange={(e) => updateScheduleInfo("content", e.target.value)}
            />
          </FlexCenterWrapper>
          <FlexCenterWrapper>
            <CategoryButton changeCategory={(category) => updateScheduleInfo("contractType", category)} />
          </FlexCenterWrapper>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={updateSchedule}>추가</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
