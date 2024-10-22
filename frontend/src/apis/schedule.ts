import axios from "axios"
import { Schedule } from "./schedule.type";

const BASE_URL = 'http://localhost:8080/api/schedules';

//== 일정 등록 ==//
export const schedule = async (scheduleData: Schedule): Promise<void> => {
  const response = await axios({
    method: 'post',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    },
    data: scheduleData
  });
  console.log(response.data);
};

//== 일정 조회 ==//
export const getSchedule = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
};