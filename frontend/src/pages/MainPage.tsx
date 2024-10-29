import BestBox from "@/components/MainPage/BestBox";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";
// import { getRankedProducts } from "@/apis/productApi";
// import { Product } from "@/apis/product.type";

const Main = () => {
  const dummyData = [
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
  ];

  const dummyMain = [
    '/main/main1.png',
    '/main/main2.png',
    '/main/main3.png',
  ];

  // //== 베스트 ==//
  // const { data: getRankedProductList } = useQuery('getRankedProducts', getRankedProducts);

  return (
    <div className="flex flex-col items-center mb-24">
      <MainCarousel dummyData={dummyMain} />
      <div className="grid grid-cols-2 gap-8 mt-10">

        {dummyData.map((src, index) => (
          <Link to={`/board/detail`} key={index}>
            <BestBox key={index} index={index+1} src={src} title="test" price={10000} />
          </Link>
        ))}

        {/* {getRankedProductList?.map((product: Product, index) => (
          <Link to={`/board/detail/${product.id}`} key={index}>
            <BestBox key={product.id} index={index+1} src={product.productImage[0]} title={product.name} price={Number(product.price)} />
          </Link>
        ))} */}

      </div>
    </div>
  );
};

export default Main;
