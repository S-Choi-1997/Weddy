// import { useQuery } from "react-query";
import BoardAsk from "../components/BoardDetailPage/BoardAsk";
import BoardContent from "../components/BoardDetailPage/BoardContent";
import BoardReview from "../components/BoardDetailPage/BoardReview";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { addProductToCart, detailProduct, getPhone, getReviewList } from "@/apis/productApi";
// import { useParams } from "react-router-dom";

const BoardDetail = () => {
  // const { productId } = useParams();

  // //== 상품 상세 데이터 ==//
  // const { data: productDetail } = useQuery(
  //   ['detailProduct', productId],
  //   () => detailProduct(productId),
  //   {enabled: !!productId}
  // );

  // //== 리뷰 리스트 ==//
  // const { data: reviewList } = useQuery(
  //   ['getReviewList', productId],
  //   () => getReviewList(productId),
  //   {enabled: !!productId}
  // );

  // //== 문의 하기 ==//
  // const { data: phone } = useQuery(
  //   ['getPhone', productId],
  //   () => getPhone(productId),
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

        {/* api 연결 후 */}
        {/* <TabsContent value="info">
          <BoardContent boardDetail={productDetail}/>
        </TabsContent>
        <TabsContent value="review">
          <BoardReview reviewList={reviewList ?? []}/>
        </TabsContent>
        <TabsContent value="ask">
          <BoardAsk phone={phone}/>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
export default BoardDetail;