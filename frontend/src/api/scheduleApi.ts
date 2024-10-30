import axios from "axios";
import { GetSchedule, Schedule } from "./schedule.type";

const BASE_URL = "http://localhost:8080/api/schedules";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcklkIjoxLCJjb2RlIjoidXNlcjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.LItYgsUBpk903SstXRFKs08_mKnd7vr7hZm-TEaRYZQ';

//== 일정 등록 ==//
export const schedule = async (scheduleData?: Schedule): Promise<void> => {
  await axios({
    method: "post",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: scheduleData
  });
};

//== 일정 조회 ==//
export const getSchedule = async (selectedDate: string): Promise<GetSchedule[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      date: selectedDate
    }
  });
  return response.data.data;
};