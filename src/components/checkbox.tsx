import classNames from "classnames";
import { CheckboxItem } from "../types";

interface CheckboxProps {
  item: CheckboxItem;
  handleCheckboxChange: (itemName: string) => void;
  handleRemoveItem: (itemName: string) => void;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-gray-900" : "bg-gray-800";
const itemStrikethrough = (checked: boolean) =>
  checked ? "line-through" : "none";

export default function Checkbox({
  item,
  handleCheckboxChange,
  handleRemoveItem,
}: CheckboxProps) {
  return (
    <div
      className={classNames("rounded my-1 py-2", itemBackground(item.checked))}
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
  );
}
