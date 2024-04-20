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
            handleCheckboxChange
              ? itemBackground(item.checked)
              : "bg-backgroundPrimaryDarker",
          )}
          key={item.name}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <label className="flex-1" key={item.name}>
              <div className="ml-4 flex">
                {handleCheckboxChange && (
                  <div className="align-middle">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.name)}
                      className="h-full mr-3 mb-2"
                    />
                  </div>
                )}
                <p
                  style={{
                    textDecoration: itemStrikethrough(item.checked),
                  }}
                >
                  {item.name}
                </p>
              </div>
            </label>
            <div>
              <button
                className="mr-1 md:mr-4 text-sm text-gray-500 px-2 h-full"
                onClick={() => handleRemoveItem(item.name)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
