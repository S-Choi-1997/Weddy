import { connectCoupleCode } from "@/apis/coupleApi";
import { EditUserInfo } from "@/apis/user.type";
import { editInfomation } from "@/apis/userApi";
import { useState } from "react";


const Mypage = () => {
  const [userInfo, setUserInfo] = useState<EditUserInfo>();

  //== 커플 코드 조회 ==//
  // const { data: myCode } = useQuery('getCoupleCode', getCoupleCode);

  //== 커플 코드 연결 ==//
  const handleConnect = async (code: string) => {
    await connectCoupleCode(code);
  };

  //== 회원 정보 수정 ==//
  const handleUpdate = async () => {
    await editInfomation(userInfo);
  };



  return (
    <div className="m-5 bg-white h-[630px] rounded-xl p-5">
      <div className="relative inline-block">
        <img
          className="bg-main1 rounded-full h-[100px] w-[100px] mt-3"
          src="/icons/profile.png"
          alt="profile image"
        />
        <img
          className="h-[30px] w-[30px] absolute bottom-0 right-0"
          src="/icons/camera.png"
          alt="camera image"
        />
      </div>
      <div className="flex justify-between ml-3 mr-10">
      <div className="flex flex-col mt-10">
        <span className="my-2 text-gray-600">이름</span>
        <span className="my-3 text-gray-600">전화번호</span>
        <span className="my-3 text-gray-600">이메일</span>
      </div>
      <div className="flex flex-col mt-10">
        <input defaultValue={'김싸피'} className="my-2 p-2 w-[150px] border border-gray-400 rounded-lg h-[30px]" type="text" />
        <input defaultValue={'010-1234-5678'} className="my-2 p-2 w-[150px] border border-gray-400 rounded-lg h-[30px]" type="text" />
        <input defaultValue={'ssafy@ssafy.com'} className="my-2 border p-2 w-[150px] border-gray-400 rounded-lg h-[30px]" type="text" />       
      </div>
      </div>
    </div>
  )
}
export default Mypage;