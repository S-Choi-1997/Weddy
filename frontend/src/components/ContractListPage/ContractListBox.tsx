import { ContractData } from "@/api/contract.type";
import { Link, useNavigate } from "react-router-dom";
import TodoButton from "../../common/TodoButton";
import GotoIcon from "../../icons/Goto";
import ProgressBar from "./ProgressBar";

interface ContractListBoxProps {
  type: string;
  contractInfo: ContractData;
}

const ContractListBox = ({ type, contractInfo }: ContractListBoxProps) => {
  const navigate = useNavigate();

  const toDetail = () => {
    navigate("/board/detail");
  };

  // const category = {
  //   STUDIO: "studio",
  //   DRESS: "dress",
  //   MAKEUP: "makeup"
  // }[type];

  return (
    <>
      <div className="h-[170px] bg-white rounded-3xl pt-10 px-5 my-5">
        <ProgressBar status={contractInfo.status} />

        <div className="flex justify-between mt-10">
          <div className="flex items-center" onClick={toDetail}>
            <h1 className="font-bold mr-4">{type}</h1>
            <GotoIcon />
          </div>

          {contractInfo.status === "CONTRACT_REQUEST" && (
            <TodoButton title="계약 요청" colorId={1} />
          )}
          {contractInfo.status === "CONTRACT_PENDING" && (
            <TodoButton title="계약 대기중" colorId={2} />
          )}
          {contractInfo.status === "SIGN_PENDING" && (
             <Link to='/contract'>
               <TodoButton title="서명 하기" colorId={1} />
             </Link>
          )}
          {contractInfo.status === "PAYMENT_PENDING" && (
            <TodoButton title="결제 하기" colorId={1} />
          )}
          {contractInfo.status === "PAYMENT_COMPLETED" && (
            <Link to='/review'>
              <TodoButton title="리뷰 쓰기" colorId={1} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default ContractListBox;
