import { useState } from "react";
import { ComboboxDemo } from "../common/Filter";
import SDMList from "../components/BoardPage/SDMList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { allProducts } from "@/apis/productApi";
// import { Product } from "@/apis/product.type";
// import { useQuery } from "react-query";

const Board = () => {
  const [ selectedRegion, setSelectedRegion ] = useState<string>("");
  const [ selectedPrice, setSelectedPrice ] = useState<string>("");
  // const [ studioList, setStudioList ] = useState<Product[]>([]);
  // const [ dressList, setDressList ] = useState<Product[]>([]);
  // const [ makeupList, setMakeupList ] = useState<Product[]>([]);

  // const { data: productList } = useQuery(
  //   ['allProducts', selectedRegion, selectedPrice],
  //   () => allProducts(selectedPrice, selectedRegion),
  //   {
  //     enabled: !!selectedPrice && !!selectedRegion,
  //   }
  // );

  const handleregionSelect = (value: string) => {
    setSelectedRegion(value);
    console.log(selectedRegion);
  };

  const handlePriceSelect = (value: string) => {
    setSelectedPrice(value);
    console.log(selectedPrice);
  };

  //dummy data
  const regions = [
    {
      value: "서울",
      label: "서울",
    },
    {
      value: "부산",
      label: "부산",
    },
    {
      value: "대구",
      label: "대구",
    },
    {
      value: "대전",
      label: "대전",
    },
    {
      value: "인천",
      label: "인천",
    },
    {
      value: "광주",
      label: "광주",
    },
    {
      value: "울산",
      label: "울산",
    },
  ];

  const prices = [
    {
      value: "5,000,000",
      label: "5,000,000",
    },
    {
      value: "10,000,000",
      label: "10,000,000",
    },
    {
      value: "15,000,000",
      label: "15,000,000",
    },
  ];
  
  // useEffect(() => {
  //   if (productList) {
  //     setStudioList(productList?.filter((product: Product) => product.type === 'studio'));
  //     setDressList(productList?.filter((product: Product) => product.type === 'dress'));
  //     setMakeupList(productList?.filter((product: Product) => product.type === 'makeup'));
  //   }
  // }, [productList]);

  return (
    <div className="mb-20 mt-5">
      <Tabs defaultValue="studio" >
        <TabsList className="flex justify-center">
          <TabsTrigger value="studio">스튜디오</TabsTrigger>
          <TabsTrigger value="dress">드레스</TabsTrigger>
          <TabsTrigger value="makeup">메이크업</TabsTrigger>
        </TabsList>

        <div className="flex text-gray-600 justify-center gap-4 mt-5">
          <ComboboxDemo lists={regions} title="지역" onSelect={handleregionSelect}/>
          <ComboboxDemo lists={prices} title="가격" onSelect={handlePriceSelect}/>
        </div>

        {/* 각 탭에 대응하는 콘텐츠를 렌더링 */}

        <TabsContent value="studio">
          <SDMList value="studio" />
        </TabsContent>

        <TabsContent value="dress">
          <SDMList value="dress" />
        </TabsContent>

        <TabsContent value="makeup">
          <SDMList value="makeup" />
        </TabsContent>

        {/* api 연결 */}

        {/* <TabsContent value="studio">
          <SDMList value="studio" productList={studioList ?? []}/>
        </TabsContent>

        <TabsContent value="dress">
          <SDMList value="dress" productList={dressList ?? []}/>
        </TabsContent>

        <TabsContent value="makeup">
          <SDMList value="makeup" productList={makeupList ?? []}/>
        </TabsContent> */}

      </Tabs>
    </div>
  );
};

export default Board;
