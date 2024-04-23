import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateSelector from "./date-selector";
import Hr from "./hr";
import { getTheme, setTheme } from "../utils";

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
  const [currentTheme, setCurrentTheme] = useState<string>(getTheme());
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

  const handleNextDay = () => {
    if (!date) {
      return;
    }

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    handleDateChange(nextDate.toISOString().split("T")[0]);
  };

  const handlePreviousDay = () => {
    if (!date) {
      return;
    }

    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    handleDateChange(previousDate.toISOString().split("T")[0]);
  };

  const changeTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    setCurrentTheme(newTheme);

    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    // Add a listener to update the theme if the system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) =>
      setCurrentTheme(e.matches ? "dark" : "light");
    mediaQuery.addListener(handleChange);

    // Clean up listener on component unmount
    return () => mediaQuery.removeListener(handleChange);
  }, [currentTheme]);

  return (
    <div className="mb-2 mt-3">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl zilla-slab">☑️ NotesForThe.Day</h1>
          <div className="mt-1 flex justify-between">
            <Link to="/today" className="underline text-xs sm:text-sm">
              Today
            </Link>
            <Link to="/about" className="underline text-xs sm:text-sm">
              About
            </Link>
            <Link to="/analytics" className="underline text-xs sm:text-sm">
              Analytics
            </Link>
          </div>
        </div>
        {setDate && date && (
          <div className="flex">
            <button
              className="cursor-pointer mr-1 mr-1 sm:mr-3"
              onClick={handlePreviousDay}
            >
              ⬅️
            </button>
            <DateSelector value={date} onChange={handleDateChange} />
            <button
              className="cursor-pointer ml-1 sm:ml-3"
              onClick={handleNextDay}
            >
              ➡️
            </button>
          </div>
        )}
        <div className="flex">
          <button className="btn mr-2" onClick={changeTheme}>
            {currentTheme === "dark" ? "🌞" : "🌙"}
          </button>
          {(handleResetTemplate || setDate) && (
            <button className="btn" onClick={toggleSettings}>
              ⚙️
            </button>
          )}
        </div>
      </div>

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
          <>
            <p className="underline">
              <Link to="/">Go to today</Link>
            </p>
            <p>
              <a href="#" className="underline" onClick={handleResetTemplate}>
                Reset template
              </a>
            </p>
          </>
        )}
      </div>

      <Hr />
    </div>
  );
}
