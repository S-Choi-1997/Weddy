import CalenderIcon from "../icons/CalenderIcon";
import FileIcon from "../icons/FileIcon";
import HomeSelectIcon from "../icons/HomeSelectIcon";
import MyIcon from "../icons/MyIcon";
import HomeIcon from "../icons/homeIcon";

const Footer = () => {
  return (
    <footer className="flex justify-between">
      {location.pathname === "/" ? (
        <HomeSelectIcon w={25} h={25} />
      ) : (
        <HomeIcon w={25} h={25} />
      )}
      <CalenderIcon w={25} h={25} />

      {/* <CalenderSelectIcon w={25} h={25} /> */}
      <FileIcon w={25} h={25} />
      {/* <FileSelectIcon w={25} h={25} /> */}
      <MyIcon w={25} h={25} />
      {/* <MySelectIcon w={25} h={25} /> */}
    </footer>
  );
};

export default Footer;