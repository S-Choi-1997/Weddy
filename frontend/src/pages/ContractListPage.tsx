import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { ContractData } from "@/api/contract.type";
import { myContract } from "@/api/contractApi";
import { useEffect, useState } from "react";

const ContractList = () => {
  const [ studioContract, setStudioContract ] = useState<ContractData>();
  const [ dressContract, setDressContract ] = useState<ContractData>();
  const [ makeupContract, setMakeupContract ] = useState<ContractData>();

  const { data: contractList } = useQuery("myContract", myContract);

  useEffect(() => {
    setStudioContract(contractList?.find((contract: ContractData) => contract.product.type === "STUDIO"));
    setDressContract(contractList?.find((contract: ContractData) => contract.product.type === "DRESS"));
    setMakeupContract(contractList?.find((contract: ContractData) => contract.product.type === "MAKEUP"));
  }, [contractList]);
  
  return (
    <div className="mt-12 mb-32 mx-5">
      {/* {contractList?.map((contract: ContractData) => (
        <ContractListBox key={contract.id} type={contract.product.type} contractInfo={contract} />
      ))} */}

      <ContractListBox type="STUDIO" contractInfo={studioContract}/>
      <ContractListBox type="DRESS" contractInfo={dressContract}/>
      <ContractListBox type="MAKEUP" contractInfo={makeupContract}/>

    </div>
  );
};

export default ContractList;