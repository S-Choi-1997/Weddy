import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from '@/api/product.type';

interface CartBoxProps {
  title: string;
  type: string;
  cartItem: Product[];
  onAmountChange: (type: string, selectedProduct: Product | null) => void;
}

const CartBox = ({ title, type, cartItem, onAmountChange }: CartBoxProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCheckboxChange = (index: number) => {
    const newIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newIndex);
    onAmountChange(type, newIndex !== null ? cartItem[newIndex] : null);
  };

  return (
    <div className="m-5">
      <h2 className="font-bold text-lg mb-3">{title}</h2>
      {cartItem.map((item, index) => (
        <div
          key={item.id}
          className="mx-1 my-5 bg-white h-[70px] w-auto rounded-lg px-5 py-3 flex justify-between"
        >
          <div className="flex items-center">
            <Checkbox
              checked={selectedIndex === index}
              onCheckedChange={() => handleCheckboxChange(index)}
            />
            <div className="flex flex-col ml-3">
              <span className="font-bold">{item.name}</span>
              <span className="text-sm text-gray-600">{item.vendorName}</span>
            </div>
          </div>
          <div>
            {Number(item.price).toLocaleString()}원
          </div>
          <div>
            <button className="text-sm">삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartBox;
