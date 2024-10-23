interface BestBoxProps {
  src: string;
  title: string;
  price: number;
}

const BestBox = ({src, title, price}:BestBoxProps) => {
  return(
    <div className="flex flex-col">
      <img className="w-[150px] h-[150px]" src={src} alt="" />
      <span>{title}</span>
      <span>{price}</span>
    </div>
  )
}

export default BestBox;