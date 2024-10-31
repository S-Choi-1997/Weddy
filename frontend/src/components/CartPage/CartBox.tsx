import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface dummyProps {
  product: string;
  totalMount: number;
  company: string;
  type: string;
}

interface CartBoxProps {
  title: string;
  type: string;
  cartItem: dummyProps[];
  onAmountChange: (type: string, amount: number) => void;
}

const CartBox = ({ title, type, cartItem, onAmountChange }: CartBoxProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCheckboxChange = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  useEffect(() => {
    const selectedAmount = selectedIndex !== null ? cartItem[selectedIndex].totalMount : 0;
    onAmountChange(type, selectedAmount);
  }, [selectedIndex, cartItem, type, onAmountChange]);

  return (
    <div className="m-5">
      <h2 className="font-bold text-lg mb-3">{title}</h2>
      {cartItem.map((item, index) => (
        <div
          key={index}
          className="mx-1 my-5 bg-white h-[70px] w-auto rounded-lg px-5 py-3 flex justify-between"
        >
          <div className="flex items-center">
            <Checkbox
              checked={selectedIndex === index}
              onCheckedChange={() => handleCheckboxChange(index)}
            />
            <div className="flex flex-col ml-3">
              <span className="font-bold">{item.product}</span>
              <span className="text-sm text-gray-600">{item.company}</span>
            </div>
          </div>
          <div>
            {item.totalMount.toLocaleString()}원
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
