import { Link, useLocation, useNavigate } from "react-router-dom"; // location을 가져오기 위해 필요
import BackIcon from "../icons/BackIcon";
import CartIcon from "../icons/CartIcon";

const Navbar = () => {
  const location = useLocation().pathname.split('/')[1];
  const locationDetail = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };
  const goCart = () => {
    navigate('/cart');
  }

  return (
    <nav>
      {location !== "" && (
        <div className="backIcon" onClick={navigateBack}>
          <BackIcon />
        </div>
      )}
      {(location === "" || location === "board" || location === "planner" ) && (locationDetail===undefined) && (
        <>
          <Link to='/board'>
            <div className="textAlign">스드메</div>
          </Link>
          <Link to='planner'>
            <div className="textAlign">WEDDY 플래너</div>
          </Link>
        </>
      )}
      {location === "contractlist" && (
        <div>나의 계약</div>
      )}
      {location === "schedule" && (
        <div>일정 관리</div>
      )}
      {location === "mypage" && (
        <div>마이페이지</div>
      )}
      {location === "cart" && (
        <div>장바구니</div>
      )}

      {location === "board" && locationDetail==="detail" && (
        <div>제품 상세</div>
      )}

      {location != "contract" && (
        <div className="cartIcon" onClick={goCart}>
          <CartIcon />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
