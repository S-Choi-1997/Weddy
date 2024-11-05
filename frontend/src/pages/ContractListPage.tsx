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
        productId: "P001",
        productName: "STUDIO Package",
        productContent: "Comprehensive studio package including photo and video sessions",
        type: "STUDIO",
      },
      customer: "Customer 1",
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
        productId: "P002",
        productName: "Dress Rental",
        productContent: "Rental of formal dresses for special events",
        type: "DRESS",
      },
      customer: "Customer 2",
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
        productId: "P003",
        productName: "Makeup Service",
        productContent: "Professional makeup service for events",
        type: "MAKEUP",
      },
      customer: "Customer 3",
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
        <ContractListBox key={contract.id} type={contract.product.type} contractInfo={contract} />
      ))}

      {/* {contractList?.map((contract: ContractData) => (
        <ContractListBox key={contract.id} type={contract.type} contractInfo={contract} />
      ))} */}
    </div>
  );
};
export default ContractList;
