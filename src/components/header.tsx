import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateSelector from "./date-selector";
import Hr from "./hr";

interface HeaderProps {
  date?: string;
  setDate?: (date: string) => void;
  handleResetDay?: (date: string) => void;
  handleResetTemplate?: () => void;
}

export default function Header({
  date,
  setDate,
  handleResetDay,
  handleResetTemplate,
}: HeaderProps) {
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
        {/* date selector on home page (daily) */}
        {setDate && date && (
          <DateSelector value={date} onChange={handleDateChange} />
        )}
        {/* show settings menu on home page (daily) and edit template page */}
        {(setDate || handleResetTemplate) && (
          <button className="btn" onClick={toggleSettings}>
            ⚙️
          </button>
        )}
      </div>

      {/* show settings menu on home page (daily) and edit template page */}
      {(setDate || handleResetTemplate) && (
        <div
          className={`text-right transition-[max-height,padding] duration-300 ease-in-out overflow-hidden ${isSettingsVisible ? "max-h-24 py-2" : "max-h-0 py-0"}`}
        >
          {/* show link to "edit template" page and "reset day" if on home page */}
          {setDate && (
            <>
              <p className="underline">
                <Link to="/edit-template">Edit template</Link>
              </p>
              <p>
                <a
                  href="#"
                  className="underline"
                  onClick={date ? () => handleResetDay?.(date) : () => {}}
                >
                  Reset day
                </a>
              </p>
            </>
          )}

          {/* show "reset template" if on edit template page */}
          {handleResetTemplate && (
            <p>
              <a href="#" className="underline" onClick={handleResetTemplate}>
                Reset template
              </a>
            </p>
          )}
        </div>
      )}

      <Hr />
    </div>
  );
}
