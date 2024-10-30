import { ReviewData } from "@/api/product.type";

interface BoardReviewProp {
  reviewList: ReviewData[]
};

const BoardReview = ({ reviewList }: BoardReviewProp) => {
  return (
    <div className="m-5">리뷰 페이지</div>
  )
}

export default BoardReview;