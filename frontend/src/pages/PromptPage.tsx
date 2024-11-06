// import { aiRecommend } from "@/api/recommendApi";
import { recommendState } from "@/store/recommendState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const Prompt = () => {
  const [placeholder, setPlaceholder] = useState("");
  const text = "모던한 분위기의 500만원대 스튜디오 추천해줘";
  const [inputValue, setInputValue] = useState("");
  const [recommendList, setRecommendList] = useRecoilState(recommendState);

  const navigate = useNavigate();

  //== 스토어에 값이 저장되어있으면 바로 planner로 이동 ==//
  useEffect(() => {
    if (recommendList.length > 0) {
      navigate("/planner");
    }
  }, []);

  const toPlanner = async () => {
    console.log(inputValue);
    // const recommendList = await aiRecommend(inputValue);
    // setRecommendList(recommendList);
    navigate("/cart");
  };

  useEffect(() => {
    let index = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setPlaceholder(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            index = 0;
            setPlaceholder("");
            startTyping();
          }, 1000);
        }
      }, 150);
    };

    startTyping();

    return () => clearInterval(typingInterval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mx-5 flex flex-col items-center mt-[220px]">
      <img src="/gifs/robot.gif" alt="" />
      <h1 className="text-center">
        AI기반의
        <span className="text-main2 ml-1 font-bold">WEDDY 플래너</span>가 <br />{" "}
        당신에게 맞는 상품을 추천해 드려요!{" "}
      </h1>
      <input
        placeholder={placeholder}
        autoFocus
        className="w-[380px] h-[50px] p-5 rounded-3xl mt-10"
        type="text"
        onChange={handleChange}
      />
      <button
        onClick={toPlanner}
        className="bg-main2 text-white w-[120px] h-[40px] rounded-xl font-bold mt-10"
      >
        추천받기
      </button>
    </div>
  );
};

export default Prompt;
