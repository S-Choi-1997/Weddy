import { getCoupleCode } from "@/api/coupleApi";
import { userInformation } from "@/api/user.type";
import { editInfomation, getUserInfo } from "@/api/userApi";
import TodoButton from "@/common/TodoButton";
import RingIcon from "@/icons/RingIcon";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Mypage = () => {
  const [isConneted, ] = useState<boolean>(true);
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
          className="bg-main1 rounded-full h-[100px] w-[100px] mt-10"
          src={imageSrc}
          alt="profile image"
        />
        <label htmlFor="profile-image">
          <img
            className="h-[30px] w-[30px] absolute bottom-0 right-0"
            src="/icons/camera.png"
            alt="camera image"
          />
          <input accept="image/*" onChange={handleFileUpload} className="hidden" id="profile-image" type="file" />
        </label>
      </div>
      <div className="flex justify-between ml-3 mr-10">
        <div className="flex flex-col mt-10">
          <span className="my-2 text-gray-600">이름</span>
          <span className="my-3 text-gray-600">전화번호</span>
          <span className="my-3 text-gray-600">이메일</span>
          <span className="my-3 text-gray-600">주소</span>
        </div>
        <div className="flex flex-col mt-10">
          <input
            defaultValue={userInfo.name}
            className="my-2 p-2 w-[180px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('name', e.target.value)}
          />
          <input
            defaultValue={userInfo.phone}
            className="my-2 p-2 w-[180px] border border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('phone', e.target.value)}
          />
          <input
            defaultValue={userInfo.email}
            className="my-2 border p-2 w-[180px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('email', e.target.value)}
          />
          <input
            defaultValue={userInfo.address}
            className="my-2 border p-2 w-[180px] border-gray-400 rounded-lg h-[30px]"
            type="text"
            onChange={(e) => updateUserInfo('address', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-10 mr-3" onClick={handleUpdate}>
        <TodoButton title="수정하기" colorId={1} />
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-main1 flex flex-col justify-center items-center p-5 h-[150px] w-[310px] mt-20 mb-14 rounded-xl">
          <div className=" text-main2 font-bold mb-3">커플 커넥트</div>
          {isConneted ? (
            <div className="flex items-center">
              <span className="">이호영</span>
              <RingIcon />
              <span>이채연</span>
            </div>
          ) : (
            <>
              <span className="font-bold text-lg mb-2">{myCode}</span>
              <span className="text-sm text-gray-500">상대방과 커플코드를 공유하세요!</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Mypage;