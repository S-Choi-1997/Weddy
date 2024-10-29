import { getCoupleCode } from "@/api/coupleApi";
import { userInformation } from "@/api/user.type";
import { editInfomation, getUserInfo } from "@/api/userApi";
import TodoButton from "@/common/TodoButton";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Mypage = () => {
  const [userInfo, setUserInfo] = useState<userInformation>({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  //== 회원 정보 ==//
  const { data: userData, isSuccess } = useQuery('getUserInfo', getUserInfo);

  //== userdata 업데이트 후 userInfo 업데이트 ==//
  useEffect(() => {
    if (isSuccess && userData) {
      setUserInfo(userData);
    }
  }, [isSuccess, userData]);

  //== 회원 정보 수정 ==//
  const handleUpdate = async () => {
    await editInfomation(userInfo);
  };

  //== 상태 업데이트 ==//
  const updateUserInfo = (key: keyof userInformation, value: string) => {
    setUserInfo((prev) => { return { ...prev, [key]: value } });
  };

  //== 커플 코드 조회 ==//
  const { data: myCode } = useQuery('getCoupleCode', getCoupleCode);

  // //== 커플 코드 연결 ==//
  // const handleConnect = async (code: string) => {
  //   await connectCoupleCode(code);
  // };

  return (
    <div className="m-5 bg-white h-auto rounded-xl p-5 mb-20">
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
          <span className="my-3 text-gray-600">쥬소</span>
        </div>
        <div className="flex flex-col mt-10">
          <input
            defaultValue={userInfo.name}
            className="my-2 p-2 w-[150px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('name', e.target.value)}
          />
          <input
            defaultValue={userInfo.phone}
            className="my-2 p-2 w-[150px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('phone', e.target.value)}
          />
          <input
            defaultValue={userInfo.email}
            className="my-2 border p-2 w-[150px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('email', e.target.value)}
          />
          <input
            defaultValue={userInfo.address}
            className="my-2 border p-2 w-[150px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('address', e.target.value)}
          />
        </div>
      </div>
      <div className="text-end my-5" onClick={handleUpdate}>
        <TodoButton title="수정하기" colorId={1} />
      </div>
      <div className="flex justify-center">
        <div className="bg-main1 flex flex-col items-center p-5 h-[150px] w-[310px] mt-12 mb-12 rounded-xl">
          <h1 className="mb-5">커플 커넥트</h1>
          <span className="font-bold text-lg">{myCode}</span>
        </div>
      </div>
    </div>
  )
}
export default Mypage;