import classNames from "classnames";
import { CheckboxItem } from "../types";
import { Draggable } from "react-beautiful-dnd";

interface CheckboxProps {
  item: CheckboxItem;
  index: number;
  handleCheckboxChange: (itemName: string) => void;
  handleRemoveItem: (itemName: string) => void;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-gray-900" : "bg-gray-800";
const itemStrikethrough = (checked: boolean) =>
  checked ? "line-through" : "none";

export default function Checkbox({
  item,
  index,
  handleCheckboxChange,
  handleRemoveItem,
}: CheckboxProps) {
  return (
    <Draggable draggableId={item.name} index={index}>
      {(provided) => (
        <div
          className={classNames(
            "rounded my-1 py-2 shadow",
            itemBackground(item.checked),
          )}
          key={item.name}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
                className="mr-4 text-sm text-gray-500 px-2"
                onClick={() => handleRemoveItem(item.name)}
              >
                Remove
              </button>
            </div>
          </label>
        </div>
      )}
    </Draggable>
  );
}
