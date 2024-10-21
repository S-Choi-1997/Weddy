import { TabsContent } from "@radix-ui/react-tabs";
import SDM from "./SDM";
import { useNavigate } from "react-router-dom";
interface SDMListProps {
  value: string;
}

const SDMList = ({ value }: SDMListProps) => {
  // dummy data
  const sdmItems = Array.from({ length: 10 });
  const navigate = useNavigate();
  const toDetail = () => {
    navigate("/board/detail");cccc
  }
  return (
      
    <div>
      <TabsContent
        value={value}
        className="flex flex-wrap justify-center gap-8"
      >
        {sdmItems.map((_, index) => (
          <div key={index} onClick={toDetail}>
            <SDM src={"./dummy/test1.jpg"} name="업체명" price={1000000} />
          </div>
        ))}
      </TabsContent>
    </div>
  );
}

export default SDMList;
