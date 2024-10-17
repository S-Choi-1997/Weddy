import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const goTest = () => {
    navigate("/test");
  }

  return (
    <>
    <div>Main Page</div>
    <button onClick={goTest}>test 이동</button>
    </>
  )
}
export default Main;