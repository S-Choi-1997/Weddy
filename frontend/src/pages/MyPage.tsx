// import { connectCoupleCode } from "@/api/coupleApi";
import { userInformation } from "@/api/user.type";
import { editInfomation, getUserInfo } from "@/api/userApi";
import TodoButton from "@/common/TodoButton";
import RingIcon from "@/icons/RingIcon";
import { firebaseTokenState } from "@/store/firebaseToken";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useRecoilValue } from 'recoil';

const Mypage = () => {
  const token = useRecoilValue(firebaseTokenState);
  const [ isConneted, ] = useState<boolean>(false);
  const [ code, setCode ] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("/icons/profile.png")
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const file = files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
  }, [imageSrc])

  const [userInfo, setUserInfo] = useState<userInformation>({
    name: '',
    phone: '',
    email: '',
    address: '',
    dateofWedding: '',
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

  //== 커플 코드 연결 ==//
  const handleConnect = async () => {
    console.log(code);
    // await connectCoupleCode(code);
  };

  const today = new Date();
  const targetDate = new Date('2024-11-19');

  const differenceInTime = targetDate.getTime() - today.getTime();
  const dDay = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  return (
    <div className="m-5 bg-white h-[700px] rounded-xl p-5">
      <h1 className="text-center mt-5">마이페이지</h1>
      <div>{token}</div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <div className="bg-main1 flex flex-col p-5 h-[200px] w-[300px] mx-3 mt-10 rounded-xl">
            <span className="font-bold text-2xl text-main2">D-{dDay}</span>
            <span className="text-sm mt-1">2024-11-19</span>
            {isConneted ? (
              <div className="flex items-center justify-center">
                <div>
                  <img
                    className="bg-main1 rounded-full h-[70px] w-[70px] mt-5"
                    src={imageSrc}
                    alt="profile image"
                  />
                  <div className="text-xs mt-1 text-blue-400">
                    <label htmlFor="profile-image">
                      <span>이미지 변경</span>
                      <input accept="image/*" onChange={handleFileUpload} className="hidden" id="profile-image" type="file" />
                    </label>
                  </div>
                </div>
                <RingIcon />
                <img
                  className="bg-main1 rounded-full h-[70px] w-[70px] "
                  src="/icons/profile.png"
                  alt="profile image"
                />
              </div>
            ) : (
              <>
                <span className="font-bold text-lg mb-2">{userData?.coupleCode}</span>
                <span className="text-sm text-gray-500">상대방과 커플코드를 공유하세요!</span>
                <input type="text" className="my-2 p-2 w-[250px] border border-gray-400 rounded-lg h-[30px]" onChange={(e) => setCode(e.target.value)}/>
                <button onClick={handleConnect}>연결</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between ml-3 mr-10 mt-10">
        <div className="flex flex-col">
          <span className="my-2 text-gray-600">이름</span>
          <span className="my-3 text-gray-600">전화번호</span>
          <span className="my-3 text-gray-600">이메일</span>
          <span className="my-3 text-gray-600">주소</span>
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={userInfo.name}
            className="my-2 p-2 w-[190px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('name', e.target.value)}
          />
          <input
            defaultValue={userInfo.phone}
            className="my-2 p-2 w-[190px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('phone', e.target.value)}
          />
          <input
            defaultValue={userInfo.email}
            className="my-2 border p-2 w-[190px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('email', e.target.value)}
          />
          <input
            defaultValue={userInfo.address}
            className="my-2 border p-2 w-[190px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('address', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-10 mb-10 mr-3" onClick={handleUpdate}>
        <TodoButton title="수정하기" colorId={1} />
      </div>
    </div>
  )
}

export default Mypage;