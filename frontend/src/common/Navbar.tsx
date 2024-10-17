import { useLocation } from "react-router-dom"; // location을 가져오기 위해 필요
import BackIcon from "../icons/BackIcon";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      {location.pathname !== "/" && (
        <div className="back-icon">
          <BackIcon />
        </div>
      )}
      <div className="textAlign">스드메</div>
      <div className="textAlign">WEDDY 플래너</div>
    </nav>
  );
};

export default Navbar;
