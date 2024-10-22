import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../apis/userApi";

const CallBack = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const userId = params.get('userId');

  useEffect(() => {
    const updateToken = async () => {
      if (userId != undefined) {
        await getToken(userId);
        navigate('/');
      };
    };
    updateToken();
  }, [userId]);

  return null;
}

export default CallBack;