import DateSelector from "./date-selector";
import Hr from "./hr";

interface HeaderProps {
  date: string;
  setDate: (date: string) => void;
}

export default function Header({ date, setDate }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between mt-3">
        <h1 className="text-2xl">☑️ notesforthe.day</h1>
        <DateSelector value={date} onChange={setDate} />
      </div>
      <Hr />
    </>
  );
}
