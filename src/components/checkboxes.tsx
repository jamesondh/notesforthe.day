interface CheckboxProps {
  list: string[];
  checkedState: { [key: string]: boolean };
  onChange: (item: string) => void;
  onRemove: (item: string) => void;
}

export default function Checkboxes({
  list,
  checkedState,
  onChange,
  onRemove,
}: CheckboxProps) {
  return (
    <div>
      {list.map((item) => (
        <div className="rounded my-1 py-2 bg-gray-800">
          <label className="flex justify-between" key={item}>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={checkedState[item]}
                onChange={() => onChange(item)}
                className="mr-2 mb-2"
              />
              {item}
            </div>
            <button className="mr-4 btn" onClick={() => onRemove(item)}>
              Remove
            </button>
          </label>
        </div>
      ))}
    </div>
  );
}
