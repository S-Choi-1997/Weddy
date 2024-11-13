import { aiRecommend } from "@/api/recommendApi";
import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    aiRecommend("ddddd")
  })
  return (
    <div>
      <h1>Test</h1>
    </div>
  )
}

export default Test;