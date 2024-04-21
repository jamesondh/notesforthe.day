import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateSelector from "./date-selector";
import Hr from "./hr";
import { getTheme } from "../utils";

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
  const [theme, setTheme] = useState<string>(getTheme());
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

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Add a listener to update the theme if the system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    mediaQuery.addListener(handleChange);

    // Clean up listener on component unmount
    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  return (
    <div className="mb-2">
      <div className="flex justify-between mt-3 mx-2">
        <div>
          <h1 className="text-2xl zilla-slab">
            <Link to="/">NotesForThe.Day</Link>
          </h1>
        </div>
        {setDate && date && (
          <DateSelector value={date} onChange={handleDateChange} />
        )}
        <div>
          <button className="btn mr-2" onClick={changeTheme}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <button className="btn" onClick={toggleSettings}>
            ⚙️
          </button>
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

      {!setDate && <Hr />}
    </div>
  );
}
