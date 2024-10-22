import { MainCarousel } from "../components/MainPage/MainCarousel";


const Main = () => {
  const dummyData = [
    '/dummy/test1.jpg',
    '/dummy/test2.jpg',
  ]

  return (
    <>
      <MainCarousel dummyData={dummyData}/>
    </>
  )
}
export default Main;