import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateSelector from "./date-selector";
import Hr from "./hr";

interface HeaderProps {
  date?: string;
  setDate?: (date: string) => void;
  handleResetDay?: () => void;
}

export default function Header({ date, setDate, handleResetDay }: HeaderProps) {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handleDateChange = (newDate: string) => {
    if (!setDate) {
      return;
    }

    setDate(newDate);
    navigate(`/${newDate}`);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mt-3 mx-2">
        <h1 className="text-xl">
          <Link to="/">☑️ NotesForThe.Day</Link>
        </h1>
        {setDate && date && (
          <>
            <DateSelector value={date} onChange={handleDateChange} />
            <button className="btn" onClick={toggleSettings}>
              ⚙️
            </button>
          </>
        )}
      </div>

      {setDate && (
        <div
          id="settings-menu"
          className={`text-right transition-[max-height,padding] duration-300 ease-in-out overflow-hidden ${isSettingsVisible ? "max-h-24 py-2" : "max-h-0 py-0"}`}
        >
          <p className="underline">
            <Link to="/edit-template">Edit template</Link>
          </p>
          <p>
            <a href="#" className="underline" onClick={handleResetDay}>
              Reset day
            </a>
          </p>
        </div>
      )}

      <Hr />
    </div>
  );
}
