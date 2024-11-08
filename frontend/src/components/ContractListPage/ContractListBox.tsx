import { ContractData } from "@/api/contract.type";
import { changeStatus } from "@/api/contractApi";
import { requestPayment } from "@/api/paymentApi";
import DropdownIcon from "@/icons/DropdownIcon";
import FileSelectIcon from "@/icons/FileSelectIcon";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Link } from "react-router-dom";
import TodoButton from "../../common/TodoButton";
import GotoIcon from "../../icons/Goto";
import ProgressBar from "./ProgressBar";


interface ContractListBoxProps {
  type: string;
  contractInfo: ContractData;
}

const ContractListBox = ({ type, contractInfo }: ContractListBoxProps) => {


  console.log("계약서 정보 ", contractInfo);
  const handleChangeStatus = async () => {
    await changeStatus(contractInfo.id);
    window.location.reload();
  };

  const handlePayment = () => {
    requestPayment(contractInfo);
  };

  return (
    <div className="mb-5">
      <Accordion
        sx={{
          boxShadow: "none",
          border: "none",
          borderRadius: "10px",
          marginY: 3,
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          className="w-[350px] h-[100px]"
          sx={{
            boxShadow: "none",
            borderBottom: "none",
            padding: "16px",
            borderRadius: "10px",
            margin: 0,
          }}
        >
          <div className="flex justify-between w-[300px]">
            <div className="flex items-center">
              <div>
                <div className="flex items-center justify-between mx-2 mb-5">
                  <h1 className="font-bold mr-4">{type}</h1>
                  <DropdownIcon />
                </div>
                <ProgressBar status={contractInfo.status} />
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "none" }}>

          <div className="flex justify-between mt-10">
            <Link to={`/board/detail/${contractInfo.product.productId}`}>
              <div className="flex items-center">
                <h1 className="font-bold mr-4">{contractInfo.companyName}</h1>
                <GotoIcon />
              </div>
            </Link>

            {contractInfo.status === "CONTRACT_PENDING" && (
              <div onClick={handleChangeStatus}>
                <TodoButton title="계약 대기중" colorId={2} cursor="default" />
              </div>
            )}
            {contractInfo.status === "SIGN_PENDING" && (
              <Link
                to={`/contract/${contractInfo.product.type}/${contractInfo.id}`}
              >
                <TodoButton title="서명 하기" colorId={1} />
              </Link>
            )}
            {contractInfo.status === "PAYMENT_PENDING" && (
              <div onClick={handlePayment}>
                <TodoButton title="결제 하기" colorId={1} />
              </div>
            )}
            {contractInfo.status === "PAYMENT_COMPLETED" && (
              <div className="flex items-center">
                <div className="mr-2">
                  <FileSelectIcon w={20} h={20} />
                </div>
                <Link to={`/review/${contractInfo.product.productId}`}>
                  <TodoButton title="리뷰 쓰기" colorId={1} />
                </Link>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ContractListBox;
