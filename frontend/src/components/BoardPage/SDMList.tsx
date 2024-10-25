import { TabsContent } from "@radix-ui/react-tabs";
import SDM from "./SDM";
import { useNavigate } from "react-router-dom";
import Search from "@/common/Search";

interface SDMListProps {
  value: string;
  // productList: Product[]
}

const SDMList = ({ value }: SDMListProps) => {
  // const [filteredList, setFilteredList] = useState<Product[]>([]);

  // dummy data
  const sdmItems = Array.from({ length: 10 });
  const navigate = useNavigate();

  const toDetail = () => {
    navigate("/board/detail");
  };

  const search = (searchTerm: string) => {
    console.log(searchTerm);
    // const data = productList.filter((product: Product) => product.vendorName === searchTerm);
    // setFilteredList(data);
  };

  return (

    <div>
      <TabsContent
        value={value}
        className="flex flex-wrap justify-center gap-8"
      >
        <Search search={search}/>
        {sdmItems.map((_, index) => (
          <div key={index} onClick={toDetail}>
            <SDM src={"./dummy/test1.jpg"} name="업체명" price={1000000} />
          </div>
        ))}
      </TabsContent>

      {/* api 연결 후 */}

      {/* <TabsContent value={value} className="flex flex-wrap justify-center gap-8">
        <Search search={search} />

        {filteredList.length > 0 ? (
          filteredList.map((product) => (
            <div key={product.productId} onClick={toDetail}>
              <SDM src={ } name={ } price={ } />
            </div>
          ))
        ) : (
          productList.map((product) => (
            <div key={product.productId} onClick={toDetail}>
              <SDM src={ } name={ } price={ } />
            </div>
          ))
        )}
      </TabsContent> */}
    </div>
  );
}

export default SDMList;
