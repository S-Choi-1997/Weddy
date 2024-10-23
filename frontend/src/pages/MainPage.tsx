import BestBox from "@/components/MianPage/BestBox";
import { MainCarousel } from "../components/MainPage/MainCarousel";

const Main = () => {
  const dummyData = [
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
  ];

  return (
    <div className="flex flex-col items-center mb-24">
      <MainCarousel dummyData={dummyData} />
      <div className="grid grid-cols-2 gap-8 mt-10"> {/* 그리드 적용 */}
        {dummyData.map((src, index) => (
          <BestBox key={index} src={src} title="test" price={10000} />
        ))}
      </div>
    </div>
  );
};

export default Main;
