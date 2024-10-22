import ContractListBox from "../components/ContractListPage/ContractListBox";

const ContractList = () => {
  return (
    <div className="m-5">
      <ContractListBox title="스튜디오" />
      <ContractListBox title="드레스" />
      <ContractListBox title="메이크업" />
    </div>
  )
}
export default ContractList;