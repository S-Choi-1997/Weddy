import { RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

interface RecommendBoxProps {
  src: string;
  name: string;
  price: number;
}

const RecommendBox = ({ src, name, price }: RecommendBoxProps) => {
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
        <RadioGroupItem value={name} id={name} />
        </div>
      </div>
    </div >
  )
}

export default RecommendBox;