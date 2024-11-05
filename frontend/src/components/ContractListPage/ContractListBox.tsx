import { ContractData } from "@/api/contract.type";
import { Link } from "react-router-dom";
import TodoButton from "../../common/TodoButton";
import GotoIcon from "../../icons/Goto";
import ProgressBar from "./ProgressBar";
import { requestPayment } from "@/api/paymentApi";
import { changeStatus } from "@/api/contractApi";

interface ContractListBoxProps {
  type: string;
  contractInfo: ContractData;
}
const ContractListBox = ({ type, contractInfo }: ContractListBoxProps) => {
  const handleChangeStatus = async () => {
    await changeStatus(contractInfo.id);
    window.location.reload();
  };

  const handlePayment = () => {
    requestPayment(contractInfo);
  };

  return (
    <>
      <div className="h-[170px] bg-white rounded-3xl pt-10 px-5 my-5">
        <ProgressBar status={contractInfo.status} />

        <div className="flex justify-between mt-10">
          <Link to={`/board/detail/${contractInfo.product.productId}`}>
            <div className="flex items-center">
              <h1 className="font-bold mr-4">{type}</h1>
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
            <Link to={`/review/${contractInfo.product.productId}`}>
              <TodoButton title="리뷰 쓰기" colorId={1} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default ContractListBox;
