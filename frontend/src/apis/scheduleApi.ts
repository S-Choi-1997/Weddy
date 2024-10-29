import axios from "axios";
import { GetSchedule, Schedule } from "./schedule.type";

const BASE_URL = "http://localhost:8080/api/schedules";

//== 일정 등록 ==//
export const schedule = async (scheduleData?: Schedule): Promise<void> => {
  const response = await axios({
    method: "post",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `,
    },
    data: scheduleData,
  });
  console.log(response.data);
};

//== 일정 조회 ==//
export const getSchedule = async (selectedDate: string): Promise<GetSchedule[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `,
    },
    params: {
      date: selectedDate
    }
  });
  console.log(response.data);
  return response.data;
};
