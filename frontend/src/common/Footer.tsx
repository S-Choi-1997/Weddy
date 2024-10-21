import { Link, useLocation } from "react-router-dom";
import CalenderIcon from "../icons/CalenderIcon";
import CalenderSelectIcon from "../icons/CalenderSelectIcon";
import FileIcon from "../icons/FileIcon";
import FileSelectIcon from "../icons/FileSelectIcon";
import HomeIcon from "../icons/HomeIcon";
import HomeSelectIcon from "../icons/HomeSelectIcon";
import MyIcon from "../icons/MyIcon";
import MySelectIcon from "../icons/MySelectIcon";

const Footer = () => {
  const location = useLocation().pathname.split('/')[1];
  return (
    <footer className="flex justify-between">
      {location === "" ? (
        <HomeSelectIcon w={25} h={25} />
      ) : (

        <Link to='/'>
          <HomeIcon w={25} h={25} />
        </Link>

      )}

      {location === "schedule" ? (
        <CalenderSelectIcon w={25} h={25} />
      ) : (
        <Link to='/schedule'>
          <CalenderIcon w={25} h={25} />
        </Link>

      )}

      {location === "contractlist" ? (
        <FileSelectIcon w={25} h={25} />
      ) : (
        <Link to='/contractlist'>
          <FileIcon w={25} h={25} />
        </Link>
      )}


      {location === "mypage" ? (
        <MySelectIcon w={25} h={25} />
      ) : (
        <Link to='/mypage'>
          <MyIcon w={25} h={25} />
        </Link>

      )}
    </footer>
  );
};

export default Footer;