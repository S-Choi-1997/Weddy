import { Link, useNavigate } from "react-router-dom";
import TodoButton from "../../common/TodoButton";
import SearchIcon from "../../icons/searchIcon";
// import { ContractData } from "@/apis/contract.type";

interface ContractListBoxProps {
  title: string;
  // contractInfo: ContractData;
}

const ContractListBox = ({ title }: ContractListBoxProps) => {
  const navigate = useNavigate();

  const toDetail = () => {
    navigate('/board/detail');
  };
  
  return (
    <>
    <div className="w-auto h-[100px] bg-white rounded-3xl p-5 flex items-center justify-between my-10">
      <div className="flex items-center" onClick={toDetail}>
      <h1 className="font-bold mr-4">{title}</h1>
      <SearchIcon />
      </div>
      {/* <TodoButton title="계약 요청" colorId={1} /> */}
      {/* <TodoButton title="계약 요청중" colorId={2} /> */}
      <Link to='/contract'>
      <TodoButton title="서명하기" colorId={1} />
      </Link>
      {/* <TodoButton title="결제하기" colorId={1} /> */}

      {/* {contractInfo.status === 'CONTRACT_PENDING' ? (
        <TodoButton title="계약 요청" colorId={1} />
        // <TodoButton title="계약 요청중" colorId={2} />
      ) : (
        contractInfo.status === 'CONTRACT_COMPLETED' ? (
          <Link to='/contract'>
            <TodoButton title="서명하기" colorId={1} />
          </Link>
        ) : (
          contractInfo.status === 'SIGN_COMPLETED' ? (
            <TodoButton title="결제하기" colorId={1} />
          ) : (
            <TodoButton title="결제완료" colorId={1} />
          )
        )
      )} */}
    </div>
    </>
  )
}
export default ContractListBox
