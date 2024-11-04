import { getToken } from "@/api/userApi";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

const CallBack = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const userId = params.get('id');

  //== 토큰 정보 ==//
  useQuery(
    ['getToken', userId],
    () => getToken(userId ?? undefined),
    {
      enabled: !!userId
    }
  );

  return null;
}

export default CallBack;