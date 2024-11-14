import { useQuery } from "react-query";
import FooterButton from "@/components/BoardDetailPage/FooterButton";
import BoardContent from "../components/BoardDetailPage/BoardContent";
import BoardReview from "../components/BoardDetailPage/BoardReview";
import { MainCarousel } from "../components/MainPage/MainCarousel";
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

      <BoardContent product={productDetail} />
      <BoardReview reviewList={reviewList ?? []} />

      <div onClick={addToCart}>
        <FooterButton />
      </div>

    </div>
  );
};

export default BoardDetail;