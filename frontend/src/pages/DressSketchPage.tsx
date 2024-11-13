import { Dress } from "@/api/dress.type";
import { getDressList } from "@/api/dressApi";
import TodoButton from "@/common/TodoButton";
import SketchBox from "@/components/DressSketchPage/Sketchbox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DressSketch = () => {
  const [dressList, setDressList] = useState<Dress[]>([]);
  
  useEffect(() => {
    getDressList().then((data: Dress[]) => {
      setDressList(data); // 가져온 데이터를 dressList에 저장
    });
  }, []);
  return (
    <div className="m-5 flex flex-col items-center">
      <div className="mt-5 mb-7">
        <Link to="/sketch">
          <TodoButton title="스케치 하기"/>
        </Link>
      </div>      
        {dressList.map((sketch, index) => (
            <SketchBox key={index} imgSrc={sketch.image} studioName={sketch.studio} dressName={sketch.dressName}/>
        ))}
    </div>
  );
};

export default DressSketch;
