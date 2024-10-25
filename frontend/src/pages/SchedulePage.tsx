import CategoryButton from "@/common/CategoryButton";
import CalenderBox from "../components/SchedulePage/CalenderBox";
// import { useQuery } from "react-query";
// import { getSchedule } from "@/apis/scheduleApi";

const Schedule = () => {
  // const { data:schedulList } = useQuery('getSchedule', getSchedule);

  const selectCategory = (category: string) => {
    console.log(category);
  };

  return (
    <div className="m-5 flex flex-col">
      <CalenderBox />
      <div className="my-5 flex justify-center">
        <CategoryButton changeCategory={selectCategory} />
      </div>

    </div>
  )
}

export default Schedule;