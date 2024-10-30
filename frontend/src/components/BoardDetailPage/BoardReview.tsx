import { ReviewData } from "@/api/product.type";

interface BoardReviewProp {
  reviewList: ReviewData[]
};

const BoardReview = ({ reviewList }: BoardReviewProp) => {
  console.log(reviewList);
  return (
    <div className="m-5">
      {reviewList.length > 0 ? (
        reviewList.map((review, index) => (
          <div key={index} className="border-b-2 border-gray-200 py-5">
            <div className="flex justify-between">
              <span className="font-bold">{review.content}</span>
              <span>{review.date}</span>
            </div>
            <div className="flex justify-between">
              <span>{review.content}</span>
              <span>{review.score}점</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">아직 리뷰가 없습니다.</p>
      )}
    </div>

  )
}

export default BoardReview;