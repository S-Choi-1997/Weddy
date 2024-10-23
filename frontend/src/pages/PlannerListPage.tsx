import SDM from "@/components/BoardPage/SDM";
import { Link } from "react-router-dom";

const PlannerList = () => {
  const sdmItems = Array.from({ length: 10 });
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-5 mb-20">
      {sdmItems.map((_, index) => (
        <div key={index}>
          <Link to='/board/detail'>
          <SDM src={"/dummy/test1.jpg"} name="업체명" price={1000000} />
          </Link>
        </div>
      ))}
    </div>
  )
}
export default PlannerList;