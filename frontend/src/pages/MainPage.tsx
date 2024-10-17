import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const goTest = () => {
    navigate("/test");
  }

  return (
    <>
    <div>이호영 바보바보</div>
    <button onClick={goTest}>test 이동</button>
    </>
  )
}
export default Main;