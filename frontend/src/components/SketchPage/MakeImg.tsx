import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetRecoilState } from "recoil";
import { capturedImageState } from "@/store/imageState";
import { useNavigate } from "react-router-dom";

interface PopoverDemoProps {
  isOpen: boolean;
  imgURL: string;
  setIsOpen: (open: boolean) => void;
}

// base64 데이터를 Blob으로 변환하는 함수
const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

const MakeImg = ({ isOpen, setIsOpen, imgURL }: PopoverDemoProps) => {
  const [studioName, setStudioName] = useState("");
  const [dressName, setDressName] = useState("");
  const setCapturedImageState = useSetRecoilState(capturedImageState);

  const navigate = useNavigate();

  const onClick = () => {
    if (imgURL) {
      try {
        // base64 데이터를 Blob으로 변환
        const blob = base64ToBlob(imgURL, "image/png");
  
        // Blob을 Recoil 상태로 저장
        setCapturedImageState(blob);
        setIsOpen(false);
        setStudioName("");
        setDressName("");
  
        navigate("/test");
      } catch (error) {
        console.error("Blob 변환 중 오류가 발생했습니다:", error);
      }
    } else {
      console.error("imgURL이 비어 있습니다. 캔버스 캡처 과정에서 문제가 있는지 확인하세요.");
    }
  
    // console.log(studioName, dressName, imgURL);
  };
  

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button style={{ display: "none" }} variant="outline"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>스케치 이미지 만들기</AlertDialogTitle>
          <AlertDialogDescription style={{ display: "flex", flexDirection: "column" }}>
            <Input
              id="studioName"
              placeholder="스튜디오명"
              className="col-span-2 h-10 my-2"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
            />
            <Input
              id="dressName"
              placeholder="드레스명"
              className="col-span-2 h-10 my-2"
              value={dressName}
              onChange={(e) => setDressName(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>스케치 저장</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MakeImg;
