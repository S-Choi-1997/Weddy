// import { useQuery } from "react-query";
// import { getCartItems } from "../apis/productApi";

import CartBox from "@/components/CartPage/CartBox";

const Cart = () => {
  //== 장바구니 목록 데이터 ==//
  // const { data:cartItem, isLoading } = useQuery('getCartItems', getCartItems);

  // if (isLoading) {
  //   return <p>Loading</p>;
  // };
  
  return (
    <div className="m-5">
      <CartBox title="스튜디오 업체명" />
      <CartBox title="드레스 업체명" />
      <CartBox title="헤어/메이크업 업체명" />
    </div>
  )
}

export default Cart;