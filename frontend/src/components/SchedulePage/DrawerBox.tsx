import CategoryButton from "@/common/CategoryButton";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import DatePick from "./DatePick";

interface DrawerBoxProps {
  isOpen: boolean;
  onClose: () => void;
}



const DrawerBox: React.FC<DrawerBoxProps> = ({ isOpen, onClose }) => {

  return (
    <div>
      <Drawer shouldScaleBackground open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-gray-500">일정 추가</DrawerTitle>
            <DrawerDescription>
              <DatePick title="시작일" />
              <DatePick title="종료일" />
            </DrawerDescription>
            <DrawerDescription>
              <input type="text" placeholder="일정을 입력하세요." className="w-[320px] border rounded-md p-3 my-2" />
            </DrawerDescription>
            <DrawerDescription className="flex justify-center">
              <CategoryButton />
            </DrawerDescription>

          </DrawerHeader>
          <DrawerFooter>
            <Button>추가</Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerBox;