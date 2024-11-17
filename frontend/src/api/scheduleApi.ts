import axios from "axios";
import { GetSchedule, Schedule } from "./schedule.type";

const BASE_URL = `/api/schedules`;

//== 일정 등록 ==//
export const schedule = async (scheduleData?: Schedule): Promise<void> => {
  console.log(scheduleData);
  console.log(sessionStorage.getItem("token"));
  await axios({
    method: "post",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token"),
      withCredentials: true,
    },
    data: scheduleData,
  });
};

//== 일정 조회 ==//
export const getSchedule = async (selectedDate: string): Promise<GetSchedule[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
    params: {
      date: selectedDate,
    },
  });
  return response.data.data;
};
