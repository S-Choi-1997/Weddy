import Search from "@/common/Search";
import { TabsContent } from "@radix-ui/react-tabs";
import { Link } from "react-router-dom";
import SDMBox from "./SDMbox";
// import { Product } from "@/apis/product.type";
// import { useState } from "react";

interface SDMListProps {
  value: string;
  // productList: Product[];
}

const SDMList = ({ value }: SDMListProps) => {
  // const [ searchTerm, setSearchTerm ] = useState<string>();
  // const [filteredList, setFilteredList] = useState<Product[]>([]);

  // dummy data
  const sdmItems = Array.from({ length: 10 });

  const search = (searchTerm: string) => {
    console.log(searchTerm);
    // const data = productList.filter((product: Product) => product.vendorName === searchTerm);
    // setFilteredList(data);
    // setSearchTerm(searchTerm);
  };

  return (
    <div>
      <TabsContent
        value={value}
        className="flex flex-wrap justify-center gap-8"
      >
        <Search search={search} />
        {sdmItems.map((_, index) => (
          <Link to={"/board/detail"} key={index}>
            <SDMBox src={"./dummy/test1.jpg"} name="업체명" price={1000000} />
          </Link>
        ))}
      </TabsContent>

      {/* api 연결 후 */}

      {/* <TabsContent
        value={value}
        className="flex flex-wrap justify-center gap-8"
      >
        <Search search={search} />

        {searchTerm ? (
          filteredList.length > 0 ? (
            filteredList.map((product: Product) => (
              <Link to={`board/detail/${product.id}`} key={product.id}>
                <SDM src={"./dummy/test1.jpg"} name="업체명" price={1000000} />
              </Link>
            ))
          ) : (
            <p>해당 상품이 없습니다.</p>
          )
        ) : (
          productList.map((product: Product) => (
            <Link to={`board/detail/${product.id}`} key={product.id}>
              <SDM src={"./dummy/test1.jpg"} name="업체명" price={1000000} />
            </Link>
          ))
        )}
      </TabsContent> */}
    </div>
  );
};

export default SDMList;
