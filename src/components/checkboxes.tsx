import { useState } from "react";
import classNames from "classnames";
import { checkboxItem } from "../types";
import InputText from "./input-text";

interface CheckboxProps {
  label: string;
  list: checkboxItem[];
  onCheck: (item: string) => void;
  onRemove: (item: string) => void;
  onAdd: (item: string) => void;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-gray-900" : "bg-gray-800";
const itemStrikethrough = (checked: boolean) =>
  checked ? "line-through" : "none";

export default function Checkboxes({
  label,
  list,
  onCheck,
  onRemove,
  onAdd,
}: CheckboxProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="mb-2">
      <p>{label}</p>
      {list.map((item) => (
        <div
          className={classNames(
            "rounded my-1 py-2",
            itemBackground(item.checked),
          )}
        >
          <label className="flex justify-between" key={item.name}>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheck(item.name)}
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
                onClick={() => onRemove(item.name)}
              >
                Remove
              </button>
            </div>
          </label>
        </div>
      ))}
      <div className="flex">
        <InputText
          placeholder="Add new mood..."
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
