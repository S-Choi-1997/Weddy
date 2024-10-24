import { Link, useNavigate } from "react-router-dom";
import TodoButton from "../../common/TodoButton";
import SearchIcon from "../../icons/searchIcon";

interface ContractListBoxProps {
  title: string;
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
        {/* <Link to='/contract'>
          <TodoButton title="서명하기" colorId={1} />
        </Link> */}
        {/* <TodoButton title="결제 하기" colorId={1} /> */}
        <Link to='/review'>
        <TodoButton title="리뷰 쓰기" colorId={2} />
        </Link>
      </div>
    </>
  )
}
export default ContractListBox
