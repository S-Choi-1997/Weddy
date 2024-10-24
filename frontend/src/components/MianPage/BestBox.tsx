import BestIcon from "@/icons/BestIcon";
interface BestBoxProps {
  src: string;
  title: string;
  price: number;
  index?: number;
}

const BestBox = ({src, title, price, index}:BestBoxProps) => {
  return(
    <div className="flex flex-col relative">
      <img className="w-[150px] h-[150px] rounded-md" src={src} alt="" />
      <div className="absolute top-0 left-0">
      <BestIcon />
      <span className="absolute top-3 left-5 text-white font-bold text-xs z-10">{index}</span>
      </div>
      <span>{title}</span>
      <span>{price.toLocaleString()}원</span>
    </div>
  )
}

export default BestBox;