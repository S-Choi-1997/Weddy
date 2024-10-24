import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

interface CartBoxProps {
  title: string;
  // product: Product;
}

const CartBox = ({ title }: CartBoxProps) => {

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
          <h1 className="font-bold mx-4">{title}</h1>
          <button className="w-[50px] h-[25px] text-sm bg-main2 rounded-lg">삭제</button>
        </div>

      </AccordionSummary>
      <AccordionDetails sx={{ border: "none" }}>
        상품 세부 정보
      </AccordionDetails>
    </Accordion>
  )
}
export default CartBox;