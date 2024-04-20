import { useState } from "react";
import InputText from "./input-text";
import CheckboxesCore from "./checkboxes-core";
import { CheckboxItem } from "../types";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils";

interface CheckboxesProps {
  initialList: string[];
  addPlaceholder: string;
}

export default function CheckboxesTemplate({
  initialList,
  addPlaceholder,
}: CheckboxesProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<CheckboxItem[]>(
    initialList.map((item) => ({ name: item, checked: false })),
  );

  const handleRemoveItem = (itemName: string) => {
    setList((prevState) => prevState.filter((item) => item.name !== itemName));
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setList((prevList) => [
        ...prevList,
        { name: inputValue.trim(), checked: false },
      ]);
      setInputValue("");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      handleAddItem();
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    setList(reorder(list, result.source.index, result.destination.index));
  };

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
