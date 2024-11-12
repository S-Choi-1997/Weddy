import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { myContract } from "@/api/contractApi";
import { useEffect, useState } from "react";
import { NftType } from "@/api/nft.type";
import { getNFT } from "@/hooks/getNFT";
import { ContractData } from "@/api/contract.type";

const ContractList = () => {
  const [ nftList, setNftLIst ] = useState<NftType[]>([]);

  const { data: contractList } = useQuery("myContract", myContract);
  
  useEffect(() => {
    const update = async () => {
      const myNFT = await getNFT();
      setNftLIst(myNFT);
    };
    update();
  }, []);

  return (
    <div className="mt-12 mb-32 mx-5">
      {nftList ? (
        <>
          {['STUDIO', 'DRESS', 'MAKEUP'].map((category: string) => (
            <ContractListBox
            type={category}
            nftList={nftList.filter((nft: NftType) => nft.type === category)}
            contractInfo={contractList?.find((contract: ContractData) => contract.product.type == category)}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ContractList;