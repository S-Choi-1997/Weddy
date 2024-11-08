import GotoIcon from "@/icons/Goto";
import { Link } from "react-router-dom";

const SketchBox = () => {
  return (
    <>
      <div className="bg-white h-[70px] rounded-lg w-[350px] my-3 p-5 flex justify-between items-center">
        <span>스튜디오명 _ 드레스명</span>
        <Link to="/dress/img">
        <GotoIcon />
        </Link>
      </div>
    </>
  )
}

export default SketchBox;