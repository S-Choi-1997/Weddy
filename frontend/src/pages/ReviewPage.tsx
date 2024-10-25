import { ReviewData } from "@/apis/product.type";
import { submitReview } from "@/apis/productApi";
import Separate from "@/common/Separate";
import TodoButton from "@/common/TodoButton";
import RatingBox from "@/components/ReviewPage/RatingBox";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const formattedDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-').replace(/\s/g, '').slice(0, 10);

  const [reviewData, setReviewData] = useState<ReviewData>({
    content: "",
    date: formattedDate,
    score: 0
  });

  //== 상태 업데이트 ==//
  const updateReviewData = (key: keyof ReviewData, value: any) => {
    setReviewData((prev) => { return { ...prev, [key]: value } });
  };

  //== 리뷰 등록 ==//
  const handleSubmit = async () => {
    await submitReview(reviewData, productId);
    navigate('/');
  };

  return (
    <div className="mb-24">
      <div className="bg-white flex flex-col h-[200px] justify-center m-5 rounded-2xl p-10">
        <span>업체명</span>
        <Separate />
        <span>상품명</span>
        <span>총금액</span>
      </div>
      <div className="bg-white h-[120px] rounded-2xl p-5 m-5 flex flex-col items-center mb-3">
        <h1 className="mb-1">상품은 만족하셨나요?</h1>
        <RatingBox getScore={(score) => updateReviewData("score", score)} />
        <span className="text-gray-400 text-xs my-2">선택해주세요.</span>
      </div>
      <div className="bg-white h-[350px] m-5 rounded-2xl p-5">
        <div className="flex flex-col items-center ">
          <h1>어떤 점이 좋았나요?</h1>
          <textarea
            className="border border-gray-400 rounded-lg p-5 h-[250px] w-[280px] mt-5"
            name="review"
            id="review"
            onChange={(e) => updateReviewData('content', e.target.value)}
          >
          </textarea>
        </div>
      </div>
      <div className="flex justify-end mt-3 mx-5" onClick={handleSubmit}>
        <TodoButton title="리뷰 등록" colorId={1} />
      </div>
    </div>
  )
}

export default Review;