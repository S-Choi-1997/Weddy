import axios from "axios";
import { GetSchedule, Schedule } from "./schedule.type";

const BASE_URL = "http://localhost:8080/api/schedules";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwidXNlck5hbWUiOiJb6rSR7KO8XzHrsJhfYzEwM1_snbTrs5HsiJhdIiwiY29kZSI6IkczNzFSTyIsImlhdCI6MTczMDQyNDQ1MSwiZXhwIjoxNzMzMDE2NDUxfQ.R7YFdmlN-IZkTeo0veuMA4W2eW_9-dXJJ-pGU8SRmPk'

//== 일정 등록 ==//
export const schedule = async (scheduleData?: Schedule): Promise<void> => {
  console.log(scheduleData);
  const response = await axios({
    method: "post",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    },
    // headers: {
    //   Authorization: sessionStorage.getItem("token"),
    // },
    data: scheduleData
  });
  console.log(response.data);
};

//== 일정 조회 ==//
export const getSchedule = async (selectedDate: string): Promise<GetSchedule[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    // headers: {
    //   Authorization: sessionStorage.getItem("token"),
    // },
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      date: selectedDate
    }
  });
  console.log(response.data.data);
  return response.data.data;
};