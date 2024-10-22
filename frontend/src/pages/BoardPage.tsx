import { ComboboxDemo } from "../common/Filter";
import SDMList from "../components/BoardPage/SDMList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { allProduct } from "../apis/productApi";
import { useQuery } from "react-query";
import { Product } from "../apis/product.type";

const Board = () => {
  // const { data: productList, isLoading } = useQuery('allProduct', allProduct);

  // if (isLoading) {
  //   return <p>Loading</p>;
  // };
  
  // //== 스드메 필터링 ==//
  // const studioProducts = productList.filter((product: Product) => product.type === 'studio');
  // const dressProducts = productList.filter((product: Product) => product.type === 'dress');
  // const makeupProducts = productList.filter((product: Product) => product.type === 'makeup');

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

  return (
    <div className="mb-20 mt-5">
      <Tabs defaultValue="studio">
        <TabsList className="flex justify-center">
          <TabsTrigger value="studio">스튜디오</TabsTrigger>
          <TabsTrigger value="dress">드레스</TabsTrigger>
          <TabsTrigger value="makeup">메이크업</TabsTrigger>
        </TabsList>
        <div className="flex justify-center gap-4 mt-5">
          <ComboboxDemo lists={regions} title="지역" />
          <ComboboxDemo lists={prices} title="가격" />
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

      </Tabs>
    </div>
  );
};

export default Board;
