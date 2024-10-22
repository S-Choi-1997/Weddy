import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import BoardAsk from "../components/BoardDetailPage/BoardAsk";
import BoardContent from "../components/BoardDetailPage/BoardContent";
import BoardReview from "../components/BoardDetailPage/BoardReview";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { addProductToCart, detailProduct } from "../apis/productApi";

const BoardDetail = () => {
  // const { productId } = useParams();

  // //== 상품 상세 데이터 ==//
  // const { data: productDetail, isLoading } = useQuery(
  //   ['detailProduct', productId],
  //   () => detailProduct(productId),
  //   {enabled: !!productId}
  // );

  // //== 장바구니 추가 ==//
  // const addCart = async () => {
  //   await addProductToCart(productId);
  // };

  const dummyData = [
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
  ];

  // if (isLoading) {
  //   return <p>Loading</p>;
  // };

  return (
    <div>
      <MainCarousel dummyData={dummyData} />
      <Tabs className="mt-5" defaultValue="info">
        <TabsList className="flex justify-center">
          <TabsTrigger value="info">상품 정보</TabsTrigger>
          <TabsTrigger value="review">리뷰</TabsTrigger>
          <TabsTrigger value="ask">문의 정보</TabsTrigger>
        </TabsList>
        {/* 각 탭에 대응하는 콘텐츠를 렌더링 */}
        <TabsContent value="info">
          <BoardContent />
        </TabsContent>
        <TabsContent value="review">
          <BoardReview />
        </TabsContent>
        <TabsContent value="ask">
          <BoardAsk />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default BoardDetail;