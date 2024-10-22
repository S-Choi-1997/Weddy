import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/schedules';

//== 일정 등록 ==//
export const schedule = async (data: any): Promise<void> => {
  const response = await axios({
    method: 'post',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    },
    data: data
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