import { useQuery } from "react-query";
import FooterButton from "@/components/BoardDetailPage/FooterButton";
import BoardAsk from "../components/BoardDetailPage/BoardAsk";
import BoardContent from "../components/BoardDetailPage/BoardContent";
import BoardReview from "../components/BoardDetailPage/BoardReview";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useParams } from "react-router-dom";
import { addProductToCart, detailProduct, getReviewList } from "@/api/productApi";

const BoardDetail = () => {
  const { productId } = useParams();

  //== 상품 상세 데이터 ==//
  const { data: productDetail } = useQuery(
    ["detailProduct", productId],
    () => detailProduct(productId),
    { enabled: !!productId }
  );

  //== 장바구니 담기 ==//
  const addToCart = async () => {
    await addProductToCart(productId);
  };

  //== 리뷰 리스트 ==//
  const { data: reviewList } = useQuery(
    ["getReviewList", productId],
    () => getReviewList(productId),
    { enabled: !!productId }
  );

  // const dummyData = [
  //   "/dummy/test1.jpg",
  //   "/dummy/test2.jpg",
  //   "/dummy/test1.jpg",
  //   "/dummy/test2.jpg",
  // ];

  return (
    <div>
      <MainCarousel imageList={productDetail?.images} />
      <Tabs className="mt-5" defaultValue="info">
        <TabsList className="flex justify-center">
          <TabsTrigger value="info">상품 정보</TabsTrigger>
          <TabsTrigger value="review">리뷰</TabsTrigger>
          <TabsTrigger value="ask">문의 정보</TabsTrigger>
        </TabsList>

        {/* 각 탭에 대응하는 콘텐츠를 렌더링 */}
        {/* <TabsContent value="info">
          <BoardContent />
        </TabsContent>
        <TabsContent value="review">
          <BoardReview />
        </TabsContent>
        <TabsContent value="ask">
          <BoardAsk />
        </TabsContent> */}

        {/* api 연결 후 */}
        <TabsContent value="info">
          <BoardContent product={productDetail} />
        </TabsContent>
        <TabsContent value="review">
          <BoardReview reviewList={reviewList ?? []} />
        </TabsContent>
        <TabsContent value="ask">
          <BoardAsk />
        </TabsContent>

        <div onClick={addToCart}>
          <FooterButton />
        </div>
      </Tabs>
    </div>
  );
};
export default BoardDetail;
