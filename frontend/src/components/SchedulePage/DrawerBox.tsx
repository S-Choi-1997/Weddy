import { Schedule } from "@/apis/schedule.type";
import { schedule } from "@/apis/scheduleApi";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import styled from "styled-components";
import DatePick from "./DatePick";

interface AlertDialogDemoProps {
  isOpen: boolean;
  onClose: () => void; // 다이얼로그를 닫을 때 사용할 콜백 함수
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
    onClose();
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>일정 추가</AlertDialogTitle>
          <AlertDialogDescription>
              <DatePick title="시작일" changeDate={(date) => updateScheduleInfo("startDate", date)} />
              <DatePick title="종료일" changeDate={(date) => updateScheduleInfo("endDate", date)} />
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
            <CategoryButton changeCategory={(category) => updateScheduleInfo("type", category)} />
          </FlexCenterWrapper>

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={updateSchedule}>추가</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
