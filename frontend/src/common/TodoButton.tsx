
interface TodoButtonProps {
  title: string;
  colorId: number;
}

const TodoButton = ({ title, colorId }: TodoButtonProps) => {
  const colorClass = colorId === 1 ? 'bg-main1' : 'bg-main2';
  return (
    <button className={`w-[120px] h-[40px] ${colorClass} rounded-3xl p-2`}>{title}</button>
  )
}
export default TodoButton;