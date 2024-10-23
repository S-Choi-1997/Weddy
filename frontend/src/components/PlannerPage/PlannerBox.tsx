import { Checkbox } from "@/components/ui/checkbox";
import SearchIcon from "@/icons/searchIcon";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Link } from "react-router-dom";

interface PlannerBoxProps {
  title: string;
}

const PlannerBox = (({ title }: PlannerBoxProps) => {
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
        <Link to='/planner/list' className="flex items-center">
        {/* 업체 선택되었으면, 선택하기 버튼 없애기 */}
        <p className="mr-1">선택하기</p>
        <SearchIcon />
        </Link>
        </div>

      </AccordionSummary>
      <AccordionDetails sx={{ border: "none" }}>
        업체 세부 정보
      </AccordionDetails>
    </Accordion>
  );
});



export default PlannerBox;
