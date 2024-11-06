import { Product } from "@/api/product.type";
import { AccordionDetails } from "@mui/material";
import { Link } from "react-router-dom";

interface PlannerListBoxProps {
  item: Product;
}

const PlannerListBox = ({ item }: PlannerListBoxProps) => {
  return (
    <AccordionDetails sx={{ border: "none" }}>
          <div className="flex justify-between items-center">
            <Link to={`/board/detail/${item?.id}`}>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-main2">
                  {item?.vendorName}
                </span>
                <span>
                  {item?.name}
                </span>
                <span className="font-bold">
                  {Number(item?.price).toLocaleString()}원
                </span>
              </div>
            </Link>
            <button className="mr-3 rounded-full w-[35px] h-[35px] bg-gray-100">삭제</button>
          </div>
        </AccordionDetails>
  );
};

export default PlannerListBox;