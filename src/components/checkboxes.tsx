import classNames from "classnames";
import InputText from "./input-text";

interface CheckboxProps {
  list: string[];
  checkedState: { [key: string]: boolean };
  onCheck: (item: string) => void;
  onRemove: (item: string) => void;
  onAdd: (item: string) => void;
}

const itemBackground = (checked: boolean) =>
  checked ? "bg-gray-900" : "bg-gray-800";
const itemStrikethrough = (checked: boolean) =>
  checked ? "line-through" : "none";

export default function Checkboxes({
  list,
  checkedState,
  onCheck,
  onRemove,
  onAdd,
}: CheckboxProps) {
  return (
    <div>
      {list.map((item) => (
        <div
          className={classNames(
            "rounded my-1 py-2",
            itemBackground(checkedState[item]),
          )}
        >
          <label className="flex justify-between" key={item}>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={checkedState[item]}
                onChange={() => onCheck(item)}
                className="mr-2 mb-2"
              />
              <span
                style={{
                  textDecoration: itemStrikethrough(checkedState[item]),
                }}
              >
                {item}
              </span>
            </div>
            <button className="mr-4 btn" onClick={() => onRemove(item)}>
              Remove
            </button>
          </label>
        </div>
      ))}
      <InputText placeholder="Add new mood..." onKeyPress={onAdd} />
    </div>
  );
}
