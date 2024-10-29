import BestBox from "@/components/MainPage/BestBox";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import { getRankedProducts } from "@/apis/productApi";
// import { Product } from "@/apis/product.type";

const Main = () => {
  const navigate = useNavigate();

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

  const toDetail = () => {
    navigate('/board/detail');
  };

  // //== 베스트 ==//
  // const { data: getRankedProductList } = useQuery('getRankedProducts', getRankedProducts);

  return (
    <div className="flex flex-col items-center mb-24">
      <MainCarousel dummyData={dummyMain} />
      <div className="grid grid-cols-2 gap-8 mt-10"> {/* 그리드 적용 */}

        {dummyData.map((src, index) => (
          <div key={index} onClick={toDetail}>
            <BestBox key={index} index={index+1} src={src} title="test" price={10000} />
          </div>
        ))}

        {/* {getRankedProductList?.map((product: Product, index) => (
          <Link to={`/board/detail/${product.id}`}>
            <BestBox key={product.id} index={index+1} src={product.productImage[0]} title={product.name} price={Number(product.price)} />
          </Link>
        ))} */}

      </div>
    </div>
  );
};

export default Main;
