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
        <label key={item}>
          <input
            type="checkbox"
            checked={checkedState[item]}
            onChange={() => onChange(item)}
            className="mr-2 mb-2"
          />
          {item}
          <button
            className="ml-2 btn border border-gray-600 rounded-sm px-1"
            onClick={() => onRemove(item)}
          >
            X
          </button>
          <br />
        </label>
      ))}
    </div>
  );
}
