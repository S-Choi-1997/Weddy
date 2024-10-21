interface SDMProps {
  src:string;
  name:string;
  price:number;
}


const SDM = ({src,name, price}:SDMProps) => {
  return (
    <div className="flex flex-col">
      <img className="w-[150px] h-[150px] rounded-xl" src={src} alt="" />
      <span className="text-gray-500">{name}</span>
      <span>{price.toLocaleString()}원</span>
    </div>
  )
}

export default SDM;