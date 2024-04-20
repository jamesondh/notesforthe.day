import classNames from "classnames";
import { CheckboxItem } from "../types";
import { Draggable } from "react-beautiful-dnd";

interface CheckboxProps {
  item: CheckboxItem;
  index: number;
  handleCheckboxChange?: (itemName: string) => void;
  handleRemoveItem: (itemName: string) => void;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-backgroundPrimaryDarker" : "bg-backgroundPrimaryDark";
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
            "rounded my-1 py-3 shadow",
            itemBackground(item.checked),
          )}
          key={item.name}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <label className="flex justify-between" key={item.name}>
            <div className="ml-4 flex justify-between">
              {handleCheckboxChange && (
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.name)}
                  className="h-full mr-3 mb-2"
                />
              )}
              <p
                style={{
                  textDecoration: itemStrikethrough(item.checked),
                }}
              >
                {item.name}
              </p>
            </div>
            <div>
              <button
                className="mr-1 md:mr-4 text-sm text-gray-500 px-2 h-full"
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
