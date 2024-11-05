import DropdownIcon from "@/icons/DropdownIcon";
import GotoIcon from "@/icons/Goto";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PlannerBoxProps {
  title: string;
  company: string;
  price: string;
  content: string;
}

const PlannerBox = (({ title, company, price, content }: PlannerBoxProps) => {
  const category = {
    스튜디오: 'STUDIO',
    드레스: 'DRESS',
    메이크업: 'MAKEUP',
  } [title];

  const navigate = useNavigate()
  const goRecommend = () => {
    navigate(`/planner/list/${category}`)
  }

  const [isChecked, setIsChecked] = useState(false);

  // company가 있는 경우 체크 상태를 true로 설정
  useEffect(() => {
    setIsChecked(!!company); // company가 존재하면 true
  }, [company]);

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
            <h1 className="font-bold mx-4">{title}</h1>
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
        <AccordionDetails sx={{ border: "none" }}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-main2">
                {company}
              </span>
              <span>
                {content}
              </span>
              <span className="font-bold">
                {price.toLocaleString()}원
              </span>
            </div>
            <button className="mr-3 rounded-full w-[35px] h-[35px] bg-gray-100">삭제</button>
          </div>
        </AccordionDetails>
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
