import { useQuery } from "react-query";
import FooterButton from "@/components/BoardDetailPage/FooterButton";
import BoardAsk from "../components/BoardDetailPage/BoardAsk";
import BoardContent from "../components/BoardDetailPage/BoardContent";
import BoardReview from "../components/BoardDetailPage/BoardReview";
import { MainCarousel } from "../components/MainPage/MainCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useParams } from "react-router-dom";
import { detailProduct, getReviewList } from "@/api/productApi";
import { addProductToCart } from "@/api/cartApi";

const BoardDetail = () => {
  const { productId } = useParams();

  //== 상품 상세 데이터 ==//
  const { data: productDetail } = useQuery(
    ["detailProduct", productId],
    () => detailProduct(productId),
    { enabled: !!productId }
  );
  
  //== 리뷰 리스트 ==//
  const { data: reviewList } = useQuery(
    ["getReviewList", productId],
    () => getReviewList(productId),
    { enabled: !!productId }
  );

  //== 장바구니 담기 ==//
  const addToCart = async () => {
    await addProductToCart(productId);
  };

  return (
    <div>
      <MainCarousel imageList={productDetail?.images} />
      <Tabs className="mt-5" defaultValue="info">
        <TabsList className="flex justify-center">
          <TabsTrigger value="info">상품 정보</TabsTrigger>
          <TabsTrigger value="review">리뷰</TabsTrigger>
          <TabsTrigger value="ask">문의 정보</TabsTrigger>
        </TabsList>

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