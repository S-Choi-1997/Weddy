import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { ContractData } from "@/api/contract.type";
import { myContract } from "@/api/contractApi";
import { useEffect, useState } from "react";
import { NftType } from "@/api/nft.type";
import { getNFT } from "@/hooks/getNFT";

const ContractList = () => {
  const [ NFTList, setNFTLIst ] = useState<NftType[]>([]);
  const [ studioContract, setStudioContract ] = useState<ContractData>();
  const [ dressContract, setDressContract ] = useState<ContractData>();
  const [ makeupContract, setMakeupContract ] = useState<ContractData>();

  const { data: contractList } = useQuery("myContract", myContract);

  
  useEffect(() => {
    setStudioContract(contractList?.find((contract: ContractData) => contract.product.type === "STUDIO"));
    setDressContract(contractList?.find((contract: ContractData) => contract.product.type === "DRESS"));
    setMakeupContract(contractList?.find((contract: ContractData) => contract.product.type === "MAKEUP"));
  }, [contractList]);
  
  useEffect(() => {
    const update = async () => {
      const myNFT = await getNFT();
      setNFTLIst(myNFT);
    };
    update();
  }, []);
  return (
    <div className="mt-12 mb-32 mx-5">
      {NFTList ? (
        <>
          <ContractListBox type="STUDIO" NftData={NFTList?.find((nft: NftType) => nft.contractId === studioContract?.id)} contractInfo={studioContract}/>
          <ContractListBox type="DRESS" NftData={NFTList?.find((nft: NftType) => nft.contractId === dressContract?.id)} contractInfo={dressContract}/>
          <ContractListBox type="MAKEUP" NftData={NFTList?.find((nft: NftType) => nft.contractId === makeupContract?.id)} contractInfo={makeupContract}/>
        </>
      ) : null}
    </div>
  );
};

export default ContractList;