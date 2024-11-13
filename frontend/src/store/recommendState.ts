import { RecommendData } from "@/api/recommend.type";
import { atom } from "recoil";

export const recommendState = atom<RecommendData[]>({
  key: 'recommendState',
  default: [],
});