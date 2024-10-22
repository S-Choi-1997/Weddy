import { Checkbox } from "@/components/ui/checkbox";
import SearchIcon from "@/icons/searchIcon";

interface PlannerBoxProps {
  title: string;
}

const PlannerBox = (({ title }: PlannerBoxProps) => {
  return (
    <div className="planner-box-style w-[350px] h-[100px] bg-white rounded-3xl p-5 my-5 flex items-center justify-between">
      <div className="flex items-center">
        <Checkbox />
        <h1 className="font-bold mx-4">{title}</h1>
      </div>
      <div className="flex items-center">
        <SearchIcon />
      </div>
    </div>
  );
});



export default PlannerBox;
