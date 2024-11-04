// import { useQuery } from "react-query";
import ContractListBox from "../components/ContractListPage/ContractListBox";
import { ContractData } from "@/api/contract.type";
// import { myContract } from "@/api/contractApi";

const ContractList = () => {
  // const { data: contractList } = useQuery("myContract", myContract);

  //dummy data
  const contracts: ContractData[] = [
    {
      id: 1,
      product: {
        product_id: "P001",
        product_name: "STUDIO Package",
        product_content: "Comprehensive studio package including photo and video sessions"
      },
      customer: "Customer 1",
      type: "STUDIO",
      content: "Detailed contract for studio package",
      status: "PAYMENT_PENDING",
      totalMount: "2000000",
      companyName: "SSAFY Studio",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-10"),
      title: "STUDIO Package Contract",
      userName: "John Doe",
      code: "C001"
    },
    {
      id: 2,
      product: {
        product_id: "P002",
        product_name: "Dress Rental",
        product_content: "Rental of formal dresses for special events"
      },
      customer: "Customer 2",
      type: "DRESS",
      content: "Contract for dress rental service",
      status: "SIGN_PENDING",
      totalMount: "1500000",
      companyName: "SSAFY Dresses",
      startDate: new Date("2024-10-15"),
      endDate: new Date("2024-10-20"),
      title: "Dress Rental Contract",
      userName: "Jane Doe",
      code: "C002"
    },
    {
      id: 3,
      product: {
        product_id: "P003",
        product_name: "Makeup Service",
        product_content: "Professional makeup service for events"
      },
      customer: "Customer 3",
      type: "MAKEUP",
      content: "Contract for makeup service",
      status: "PAYMENT_COMPLETED",
      totalMount: "1000000",
      companyName: "SSAFY Makeup",
      startDate: new Date("2024-10-25"),
      endDate: new Date("2024-10-30"),
      title: "Makeup Service Contract",
      userName: "Alice Doe",
      code: "C003"
    }
  ];
  
  return (
    <div className="my-12 mx-5">
      {contracts.map((contract) => (
        <ContractListBox key={contract.id} type={contract.type} contractInfo={contract} />
      ))}

      {/* {contractList?.map((contract: ContractData) => (
        <ContractListBox key={contract.id} type={contract.type} contractInfo={contract} />
      ))} */}
    </div>
  );
};
export default ContractList;
