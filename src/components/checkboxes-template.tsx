import InputText from "./input-text";
import CheckboxesCore from "./checkboxes-core";
import { CheckboxItem } from "../types";

interface CheckboxesProps {
  list: CheckboxItem[];
  addPlaceholder: string;
  inputValue: string;
  handleRemoveItem: (itemName: string) => void;
  onDragEnd: (result: any) => void;
  setInputValue: (value: string) => void;
  handleAddItem: () => void;
  handleKeyPress: (key: string) => void;
}

export default function CheckboxesTemplate({
  list,
  addPlaceholder,
  inputValue,
  handleRemoveItem,
  onDragEnd,
  setInputValue,
  handleAddItem,
  handleKeyPress,
}: CheckboxesProps) {
  return (
    <div>
      <CheckboxesCore
        list={list}
        handleRemoveItem={handleRemoveItem}
        onDragEnd={onDragEnd}
      />
      <div className="flex">
        <InputText
          placeholder={addPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyPress={handleKeyPress}
          backgroundColor="bg-backgroundPrimaryDarker"
        />
        <button
          className="ml-1 btn bg-backgroundPrimaryDarker rounded px-6 shadow"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
    </div>
  );
}
