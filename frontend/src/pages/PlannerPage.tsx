import TodoButton from "@/common/TodoButton";
import PlannerBox from "@/components/PlannerPage/PlannerBox";
// import { recommendState } from "@/store/recommendState";
// import { useRecoilValue } from "recoil";
// import { useEffect, useState } from "react";
// import { Product } from "@/api/product.type";

const Planner = () => {
  // const recommendList = useRecoilValue(recommendState);
  // const [ studioList, setStudioList ] = useState<Product[]>([]);
  // const [ dressList, setDressList ] = useState<Product[]>([]);
  // const [ makeupList, setMakeupList ] = useState<Product[]>([]);

  // useEffect(() => {
  //   if (recommendList) {
  //     const studios: Product[] = [];
  //     const dresses: Product[] = [];
  //     const makeups: Product[] = [];

  //     recommendList.forEach((product) => {
  //       switch (product.type) {
  //         case "STUDIO":
  //           studios.push(product);
  //           break;
  //         case "DRESS":
  //           dresses.push(product);
  //           break;
  //         case "MAKEUP":
  //           makeups.push(product);
  //           break;
  //         default:
  //           break;
  //       }
  //     });

  //     setStudioList(studios);
  //     setDressList(dresses);
  //     setMakeupList(makeups);
  //   }
  // }, [recommendList]);

  const dummyList = [
    {
      category: '스튜디오',
      company: '포에버마인스튜디오',
      price: '10000000',
      content: '앨범1권(20P) + 기본 액자 1개'
    },
    {
      category: '드레스',
      company: '루이즈 블랑',
      price: '37000000',
      content: '[촬영+본식] 드레스4벌'
    },
    {
      category: '메이크업',
      company: '',
      price: '0',
      content: ''
    },
  ];

  const totalPrice = dummyList.reduce((acc, dummy) => acc + Number(dummy.price), 0);

  return (
    <div className="flex flex-col relative">
      <div className="m-5 flex flex-col items-center">
        {/* <h1 className="my-3 text-main2">WEDDY 플래너</h1> */}
        <div className="flex items-center mt-5">
          <span className="text-sm">
            <span className="text-main2 font-bold">
              WEDDY 플래너&nbsp;
            </span>
            추천 상품</span>
        </div>
        {dummyList.map((dummy, index) => (
          <PlannerBox key={index} title={dummy.category} company={dummy.company} price={dummy.price} content={dummy.content} />
        ))}

        {/* {studioList.map((product: Product) => (
          <PlannerBox key={product.id} title="스튜디오" company={product.vendorName} price={product.price} content={product.content} />
        ))}

        {dressList.map((product: Product) => (
          <PlannerBox key={product.id} title="드레스" company={product.vendorName} price={product.price} content={product.content} />
        ))}

        {makeupList.map((product: Product) => (
          <PlannerBox key={product.id} title="메이크업" company={product.vendorName} price={product.price} content={product.content} />
        ))} */}

      </div>
      <div className="flex justify-end mr-10 mt-14">
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
      <div className="flex justify-end mr-10 mt-5 mb-24">
        <TodoButton title="계약 요청" />
      </div>
    </div>
  )
}

export default Planner;