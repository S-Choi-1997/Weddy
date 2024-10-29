import { Checkbox } from "@/components/ui/checkbox";
import GotoIcon from "@/icons/Goto";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PlannerBoxProps {
  title: string;


}

const PlannerBox = (({ title }: PlannerBoxProps) => {
  const category = {
    스튜디오: 'studio',
    드레스: 'dress',
    메이크업: 'makeup',
  }[title];

  const navigate = useNavigate()
  const goRecommend = () => {
    navigate(`/planner/list/${category}`)
  }

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
          <div className="flex">
            <Checkbox />
            <h1 className="font-bold mx-4">{title}</h1>
          </div>
          <div onClick={goRecommend} className="flex items-center">
            {/* 업체 선택되었으면, 선택하기 버튼 없애기 */}
            <p className="mr-1">상품 보러가기</p>
            <GotoIcon />
          </div>
        </div>

      </AccordionSummary>
      <AccordionDetails sx={{ border: "none" }}>
        업체 세부 정보
      </AccordionDetails>
    </Accordion>
  );
});



export default PlannerBox;
