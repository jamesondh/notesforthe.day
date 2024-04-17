import { useState } from "react";
import DateSelector from "./date-selector";
import Hr from "./hr";

interface HeaderProps {
  date: string;
  setDate: (date: string) => void;
  handleResetDay: () => void;
}

export default function Header({ date, setDate, handleResetDay }: HeaderProps) {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <>
      <div className="flex justify-between mt-3 mx-2">
        <h1 className="text-xl">☑️ notesforthe.day</h1>
        <DateSelector value={date} onChange={setDate} />
        <button className="btn" onClick={toggleSettings}>
          ⚙️
        </button>
      </div>
      <div
        id="settings-menu"
        className={`text-right transition-[max-height,padding] duration-300 ease-in-out overflow-hidden ${isSettingsVisible ? "max-h-24 py-2" : "max-h-0 py-0"}`}
      >
        <p>
          <a href="#" className="underline" onClick={handleResetDay}>
            Reset day
          </a>
        </p>
      </div>
      <Hr />
    </>
  );
}
