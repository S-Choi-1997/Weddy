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

interface DrawerBoxProps {
  isOpen: boolean;
  onClose: () => void;
}



const DrawerBox: React.FC<DrawerBoxProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer shouldScaleBackground open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>추가</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBox;