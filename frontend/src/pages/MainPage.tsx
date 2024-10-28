import BestBox from "@/components/MainPage/BestBox";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const dummyData = [
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
  ];

  const dummyMain = [
    '/main/main1.png',
    '/main/main2.png',
    '/main/main3.png',
  ];

  const toDetail = () => {
    navigate('/board/detail');
  };

  return (
    <div className="flex flex-col items-center mb-24">
      <MainCarousel dummyData={dummyMain} />
      <div className="grid grid-cols-2 gap-8 mt-10"> {/* 그리드 적용 */}
        {dummyData.map((src, index) => (
          <div key={index} onClick={toDetail}>
            <BestBox key={index} index={index+1} src={src} title="test" price={10000} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
