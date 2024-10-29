import PlannerBox from "@/components/PlannerPage/PlannerBox";
import GiftIcon from "@/icons/GiftIcon";


const Planner = () => {
  const dummyList = [
    {
      category: '스튜디오',
      company: '포에버마인스튜디오',
      price: 10000000,
      content: '앨범1권(20P) + 기본 액자 1개'
    },
    {
      category: '드레스',
      company: '루이즈 블랑',
      price: 37000000,
      content: '[촬영+본식] 드레스4벌'
    },
    {
      category: '메이크업',
      company: '',
      price: 0,
      content: ''
    },
  ]

  const totalPrice = dummyList.reduce((acc, dummy) => acc + dummy.price, 0);


  return (
    <div className="relative">
      <div className="m-5 flex flex-col items-center">
        <h1 className="my-3 text-main2">WEDDY 플래너</h1>
        <div className="flex items-center">
        <span className="text-sm">WEDDY 플래너가 추천하는 상품</span>
          <GiftIcon/>
        </div>
        {dummyList.map((dummy, index) => (
          <PlannerBox key={index} title={dummy.category} company={dummy.company} price={dummy.price} content={dummy.content} />
        ))}

      </div>
      <div className="flex justify-end mr-10 mt-20 mb-24">
        <div className="flex flex-col mr-3">
          {dummyList.map((dummy, index) => (
            <span key={index} className="my-1">
              {dummy.company ? dummy.company : "상품 없음"}
            </span>
          ))}
          <span className="font-bold mt-2">총 가격: </span>
        </div>
        <div className="flex flex-col text-end">
          {dummyList.map((dummy, index) => (
            <span key={index} className="my-1">{dummy.price.toLocaleString()}원</span>
          ))}
          <span className="font-bold">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  )
}

export default Planner;