import CartBox from "@/components/CartPage/CartBox";

const Cart = () => {
  // //== 장바구니 목록 데이터 ==//
  // const { data: cartItem } = useQuery('getCartItems', getCartItems);

  // const studio = cartItem?.find((item: Product) => item.type === 'studio');
  // const dress = cartItem?.find((item: Product) => item.type === 'dress');
  // const makeup = cartItem?.find((item: Product) => item.type === 'makeup');
  
  return (
    <div className="m-5">
      <CartBox title="스튜디오 업체명" />
      <CartBox title="드레스 업체명" />
      <CartBox title="헤어/메이크업 업체명" />
    </div>
  )
}

export default Cart;