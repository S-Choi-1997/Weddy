interface ScheduleProps {
  type: "studio" | "dress" | "makeup" | "etc";
  title: string;
}

const ScheduleBox = ({ type,title }: ScheduleProps) => {
  const backgroundColor = {
    studio: "bg-main3",
    dress: "bg-main1",
    makeup: "bg-main4",
    etc: "bg-gray-200",
  }[type];

  return (
    <div className="flex items-center my-2">
    <div className={`${backgroundColor}  rounded-lg h-[50px] w-[10px] mr-2`}></div>
      <span>{title}</span>
    </div>
  )
}

export default ScheduleBox;