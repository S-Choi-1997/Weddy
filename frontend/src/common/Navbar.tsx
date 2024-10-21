import { Link, useLocation } from "react-router-dom"; // location을 가져오기 위해 필요
import BackIcon from "../icons/BackIcon";

const Navbar = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  // const navigateBack = () => {
  //   navigate(-1);
  // };

  return (
    <nav>
      {location.pathname !== "/" && (
        <div className="backIcon">
          <Link to='/'>
            <BackIcon />
          </Link>
        </div>
      )}
      {(location.pathname === "/" || location.pathname === "/board" || location.pathname === "/planner") ? (
      <>
      <Link to='/board'>
        <div className="textAlign">스드메</div>
      </Link>
      <Link to='planner'>
        <div className="textAlign">WEDDY 플래너</div>
      </Link>
        </>
        ):(
          <div></div>
        )}
    </nav>
  );
};

export default Navbar;
