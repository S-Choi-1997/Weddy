import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { ContractData } from "@/api/contract.type";
import { myContract } from "@/api/contractApi";
import { Link } from "react-router-dom";

const ContractList = () => {
  const { data: contractList } = useQuery("myContract", myContract);

  //dummy data
  // const contracts: ContractData[] = [
  //   {
  //     id: 1,
  //     productName: "STUDIO Package",
  //     type: "STUDIO",
  //     status: "PAYMENT_PENDING",
  //     totalMount: "2000000",
  //     downPayment: "1000000",
  //     finalPayment: "1000000",
  //     companyName: "SSAFY Studio",
  //     startDate: new Date("2024-10-01"),
  //     endDate: new Date("2024-10-10")
  //   },
  //   {
  //     id: 2,
  //     productName: "Dress Rental",
  //     type: "DRESS",
  //     status: "SIGN_PENDING",
  //     totalMount: "1500000",
  //     downPayment: "500000",
  //     finalPayment: "1000000",
  //     companyName: "SSAFY Dresses",
  //     startDate: new Date("2024-10-15"),
  //     endDate: new Date("2024-10-20")
  //   },
  //   {
  //     id: 3,
  //     productName: "Makeup Service",
  //     type: "MAKEUP",
  //     status: "PAYMENT_COMPLETED",
  //     totalMount: "1000000",
  //     downPayment: "500000",
  //     finalPayment: "500000",
  //     companyName: "SSAFY Makeup",
  //     startDate: new Date("2024-10-25"),
  //     endDate: new Date("2024-10-30")
  //   }
  // ];

  return (
    <div className="my-12 mx-5">
      {/* {contracts.map((contract) => (
        <ContractListBox key={contract.id} type={contract.type} contractInfo={contract} />
      ))} */}

      {contractList?.map((contract: ContractData) => (
        <ContractListBox type={contract.type} contractInfo={contract} />
      ))}
    </div>
  );
};
export default ContractList;
