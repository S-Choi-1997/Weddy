import { RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

interface RecommendBoxProps {
  src: string;
  name: string;
  price: number;
  onSelect: (value: string) => void;
  isSelected: boolean; // 선택 여부를 나타내는 prop 추가
}

const RecommendBox = ({ src, name, price, onSelect, isSelected }: RecommendBoxProps) => {
  return (
    <div className="flex flex-col">
      <Link to='/board/detail'>
        <img className="w-[150px] h-[150px] rounded-xl" src={src} alt="image" />
      </Link>
      <div className="flex items-center justify-between">
        <Link to='/board/detail'>
          <div className="flex flex-col">
            <span className="text-gray-500 mt-2">{name}</span>
            <span>{price.toLocaleString()}원</span>
          </div>
        </Link>
        <div className="mr-3">
          <button
            onClick={() => onSelect(name)}
            className={`mt-2 ${isSelected ? 'text-main2' : 'text-gray-400'}`} // 선택된 경우 색상 변경
          >
            <div className="flex items-center justify-center rounded-full h-[40px] w-[40px] bg-white ">
            <span className="font-bold text-xs">WEDDY</span>
            </div>
          </button>
          <RadioGroupItem value={name} id={name} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default RecommendBox;
