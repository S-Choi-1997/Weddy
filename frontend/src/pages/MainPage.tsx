import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const goTest = () => {
    navigate("/test");
  }

  return (
    <>
      <div>Main Page</div>
    </>
  )
}
export default Main;