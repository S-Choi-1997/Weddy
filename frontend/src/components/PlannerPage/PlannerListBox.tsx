import { Product } from "@/api/product.type";
import DropdownIcon from "@/icons/DropdownIcon";
import GotoIcon from "@/icons/Goto";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlannerListBox from "./PlannerBox";

interface PlannerBoxProps {
  category: string;
  productList: Product[];
}

const PlannerBox = (({ category, productList }: PlannerBoxProps) => {

  const navigate = useNavigate()
  const goRecommend = () => {
    navigate(`/planner/list/${category}`);
  }

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!!productList.length);
  }, [productList]);

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        border: "none",
        borderRadius: "8px",
        marginY: 3,
        "&:before": {
          display: "none",
        },
      }}>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        className="w-[350px] h-[100px]"
        sx={{
          boxShadow: "none",
          borderBottom: "none",
          padding: "16px",
          margin: 0,
        }}
      >
        <div className="flex justify-between w-[300px]">
          <div className="flex items-center">
            <button
              className={`${isChecked ? 'text-main2 bg-mainbg rounded-full h-[35px] w-[35px]' : 'text-gray-400 bg-gray-100 rounded-full h-[35px] w-[35px]'}`}
            >
              <div className="flex items-center justify-center">
                <span className="font-bold text-xs">WEDDY</span>
              </div>
            </button>
            <h1 className="font-bold mx-4">{category}</h1>
          </div>

          {isChecked == true ?(
            <div className="flex items-center">
            <DropdownIcon />
            </div>
          ):
          (
            <div onClick={goRecommend} className="flex items-center">
              <p className="mr-1">상품 보러가기</p>
              <GotoIcon />
            </div>
          )}
        </div>

      </AccordionSummary>
      {isChecked ? (
        productList.map((item: Product) => (
          <div key={item.id}>
            <PlannerListBox item={item}/>
          </div>
        ))
        
      ) : (
        <AccordionDetails sx={{ border: "none" }}>
          <div className="flex justify-center items-center">
            <p>상품이 없습니다.</p>
          </div>
        </AccordionDetails>
      )}
      
    </Accordion>
  );
});

export default PlannerBox;
