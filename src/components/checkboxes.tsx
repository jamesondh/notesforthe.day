import { useState } from "react";
import classNames from "classnames";
import { CheckboxItem } from "../types";
import InputText from "./input-text";
import LoadOrInitializeData from "../hooks/load-or-initialize-data";
import PushUpdateToDb from "../hooks/push-update-to-db";

interface CheckboxProps {
  label: string;
  date: string;
  initialList: string[];
  addPlaceholder: string;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-gray-900" : "bg-gray-800";
const itemStrikethrough = (checked: boolean) =>
  checked ? "line-through" : "none";

export default function Checkboxes({
  label,
  date,
  initialList,
  addPlaceholder,
}: CheckboxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<CheckboxItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  LoadOrInitializeData({
    date,
    label,
    initialValue: initialList.map((item) => ({ name: item, checked: false })),
    setValue: setList,
    setIsLoaded,
  });
  PushUpdateToDb({ date, label, isLoaded, value: list });

  const handleCheckboxChange = (itemName: string) => {
    setList((prevState) =>
      prevState.map((mood) =>
        mood.name === itemName ? { ...mood, checked: !mood.checked } : mood,
      ),
    );
  };

  const handleRemoveItem = (itemName: string) => {
    setList((prevState) => prevState.filter((mood) => mood.name !== itemName));
  };

  const handleAddItem = () => {
    const newItem = inputValue.trim();
    if (newItem !== "") {
      // if list does not already contain the item, add it
      if (
        list.length === 0 ||
        !list.map((item) => item.name).includes(newItem)
      ) {
        setList((prevList) => [...prevList, { name: newItem, checked: false }]);
      }
      setInputValue("");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="mb-3">
      <p>{label}</p>
      {list &&
        list.map((item) => (
          <div
            className={classNames(
              "rounded my-1 py-2",
              itemBackground(item.checked),
            )}
            key={item.name}
          >
            <label className="flex justify-between" key={item.name}>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.name)}
                  className="mr-2 mb-2"
                />
                <span
                  style={{
                    textDecoration: itemStrikethrough(item.checked),
                  }}
                >
                  {item.name}
                </span>
              </div>
              <div>
                {/* <button className="mr-4 btn text-sm bg-black rounded px-2">
              Edit
            </button> */}
                <button
                  className="mr-4 btn text-sm bg-black rounded px-2"
                  onClick={() => handleRemoveItem(item.name)}
                >
                  Remove
                </button>
              </div>
            </label>
          </div>
        ))}
      <div className="flex">
        <InputText
          placeholder={addPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-1 btn bg-black rounded px-2 border border-gray-700"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
    </div>
  );
}
