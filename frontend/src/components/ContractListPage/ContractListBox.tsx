import { Link } from "react-router-dom";
import TodoButton from "../../common/TodoButton";

interface ContractListBoxProps {
  title: string;
}

const ContractListBox = ({ title }: ContractListBoxProps) => {
  return (
    <div className="w-auto h-[100px] bg-white rounded-3xl p-5 flex items-center justify-between my-5">
      <h1 className="font-bold">{title}</h1>
      {/* <TodoButton title="계약 요청" colorId={1} /> */}
      {/* <TodoButton title="계약 요청중" colorId={2} /> */}
      <Link to='/contract'>
      <TodoButton title="서명하기" colorId={1} />
      </Link>
      {/* <TodoButton title="결제하기" colorId={1} /> */}
    </div>
  )
}
export default ContractListBox
