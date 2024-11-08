import { createContract } from "@/api/contractApi";
import { Product } from "@/api/product.type";
import { deleteFromCart, getCartItems } from "@/api/productApi";
import TodoButton from "@/common/TodoButton";
import CartListBox from "@/components/CartPage/CartListBox";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const [studioList, setStudioList] = useState<Product[]>([]);
  const [dressList, setDressList] = useState<Product[]>([]);
  const [makeupList, setMakeupList] = useState<Product[]>([]);

  const [selectedList, setSelectedList] = useState<{ [type: string]: Product | null }>({
    STUDIO: null,
    DRESS: null,
    MAKEUP: null,
  });

  const { data: cartList } = useQuery("getCartItems", getCartItems);

  useEffect(() => {
    if (Array.isArray(cartList)) {
      setStudioList(cartList.filter((item: Product) => item.type === "STUDIO"));
      setDressList(cartList.filter((item: Product) => item.type === "DRESS"));
      setMakeupList(cartList.filter((item: Product) => item.type === "MAKEUP"));
    }
  }, [cartList]);

  //== 총 가격 계산 ==//
  const totalAmount = Object.values(selectedList).reduce((acc, item) => acc + (Number(item?.price) || 0), 0).toLocaleString();

  //== 선택한 상품 변경 ==//
  const handleProductChange = (category: string, product: Product | null) => {
    setSelectedList((prev) => ({
      ...prev,
      [category]: product,
    }));
  };

  //== 계약서 요청 ==//
  const handleCreateContract = async () => {
    const contractItems = Object.values(selectedList).filter(Boolean) as Product[];
    await createContract(contractItems);
    navigate("/contract/list");
  };

  const deleteCartItem = async(category: string, id: string) => {
    if (category === 'STUDIO') {
      setStudioList(studioList.filter((item) => item.id !== id));
    } else if (category === 'DRESS') {
      setDressList(dressList.filter((item) => item.id !== id));
    } else if (category === 'MAKEUP') {
      setMakeupList(makeupList.filter((item) => item.id !== id));
    }

    await deleteFromCart(id);
  };

  return (
    <div className="flex flex-col relative">
      <div className="m-5 flex flex-col items-center">

        <CartListBox
          category="STUDIO"
          productList={studioList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
        <CartListBox
          category="DRESS"
          productList={dressList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
        <CartListBox
          category="MAKEUP"
          productList={makeupList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
      </div>
      
      <div className="flex justify-end mr-10 mt-14">
        <div className="flex flex-col mr-3">
        {Object.entries(selectedList).map(([category, item]) =>
          item?.name ? (
            <span key={category} className="my-1">
              {item.name}
            </span>
          ) : null
        )}
          <span className="font-bold mt-2">총 가격: </span>
        </div>
        <div className="flex flex-col text-end">
        {Object.entries(selectedList).map(([category, item]) =>
          item?.price ? (
            <span key={category} className="my-1">
              {Number(item.price).toLocaleString()}원
            </span>
          ) : null
        )}
          <span className="font-bold mt-2">{totalAmount.toLocaleString()}원</span>
        </div>
      </div>
      
      <div className="flex justify-end mr-10 mt-5 mb-24" onClick={handleCreateContract}>
        <TodoButton title="계약 요청" />
      </div>
    </div>
  );
};

export default CartPage;