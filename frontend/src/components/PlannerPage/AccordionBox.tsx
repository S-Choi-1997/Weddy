import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import PlannerBox from "./PlannerBox";

interface AccordionBoxProps {
  title: string;
}

const AccordionBox = ({ title }: AccordionBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div onClick={handleClick}>
          <PlannerBox title={title} />
        </div>
        {isOpen && (
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionBox;
