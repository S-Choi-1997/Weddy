import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { ContractData } from "@/api/contract.type";
import { myContract } from "@/api/contractApi";

const ContractList = () => {
  const { data: contractList } = useQuery("myContract", myContract);
  
  return (
    <div className="mt-12 mb-32 mx-5">
      {contractList?.map((contract: ContractData) => (
        <ContractListBox key={contract.id} type={contract.product.type} contractInfo={contract} />
      ))}
    </div>
  );
};

export default ContractList;