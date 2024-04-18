import { useState } from "react";
import { CheckboxItem } from "../types";
import InputText from "./input-text";
import Checkbox from "./checkbox";
import LoadOrInitializeData from "../hooks/load-or-initialize-data";
import PushUpdateToDb from "../hooks/push-update-to-db";

interface CheckboxProps {
  label: string;
  date: string;
  initialList: string[];
  addPlaceholder: string;
}

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
          <Checkbox
            key={item.name}
            item={item}
            handleCheckboxChange={handleCheckboxChange}
            handleRemoveItem={handleRemoveItem}
          />
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
