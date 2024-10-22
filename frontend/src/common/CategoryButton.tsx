import { useState } from "react";

const CategoryButton=()=>{
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    // 클릭한 버튼의 이름을 상태로 저장
    setSelectedButton(buttonName);
  };
  return (
    // <div className="flex justify-center">
    <>
    <button
    onClick={() => handleButtonClick('스튜디오')}
    className={`bg-main3 w-[90px] h-[30px] text-black flex items-center justify-center rounded-2xl p-1 m-1 ${
      selectedButton === '스튜디오' ? 'border-2 border-main6' : ''
    }`}
  >
    스튜디오
  </button>
  <button
    onClick={() => handleButtonClick('드레스')}
    className={`bg-main1 w-[90px] h-[30px] text-black flex items-center justify-center rounded-2xl p-1 m-1 ${
      selectedButton === '드레스' ? 'border-2 border-main2' : ''
    }`}
  >
    드레스
  </button>
  <button
    onClick={() => handleButtonClick('메이크업')}
    className={`bg-main4 w-[90px] h-[30px] text-black flex items-center justify-center rounded-2xl p-1 m-1 ${
      selectedButton === '메이크업' ? 'border-2 border-main5' : ''
    }`}
  >
    메이크업
  </button>
    </>
    // </div>
  )
}

export default CategoryButton;