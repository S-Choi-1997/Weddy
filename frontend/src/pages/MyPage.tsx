import { connectCoupleCode, getCoupleCode } from "@/apis/coupleApi";
import { EditUserInfo } from "@/apis/user.type";
import { editInfomation } from "@/apis/userApi";
import { useState } from "react";
import { useQuery } from "react-query";

const Mypage = () => {
  const [ userInfo, setUserInfo ] = useState<EditUserInfo>();

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
    <div className="m-5">
      <h1>My Page</h1>
    </div>
  )
}
export default Mypage;