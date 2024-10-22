import CategoryButton from "@/common/CategoryButton";
import CalenderBox from "../components/SchedulePage/CalenderBox";

const Schedule = () => {
  const selectCategory = () => {
    
  };

  return (
    <div className="m-5 flex flex-col">
      <CalenderBox />
      <div className="my-5 flex justify-center">
      <CategoryButton changeCategory={selectCategory}/>
      </div>
    </div>
  )
}

export default Schedule;