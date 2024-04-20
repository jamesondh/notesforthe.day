import { useState } from "react";
import InputText from "./input-text";
import CheckboxesCore from "./checkboxes-core";
import LoadOrInitializeData from "../hooks/load-or-initialize-data";
import PushUpdateToDb from "../hooks/push-update-to-db";
import { CheckboxItem } from "../types";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils";

interface CheckboxesProps {
  label: string;
  date: string;
  initialList: string[];
  addPlaceholder: string;
}

export default function Checkboxes({
  label,
  date,
  initialList,
  addPlaceholder,
}: CheckboxesProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<CheckboxItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  LoadOrInitializeData({
    date,
    label,
    initialValue: initialList.map((item) => ({ name: item, checked: false })),
    setValue: setList,
    setIsLoaded,
  });

  PushUpdateToDb({ date, label, isLoaded, value: list });

  const handleCheckboxChange = (itemName: string) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.name === itemName ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

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

    setList([...reorder(list, result.source.index, result.destination.index)]);
  };

  return (
    <div className="mb-5">
      <p>{label}</p>
      <CheckboxesCore
        list={list}
        handleCheckboxChange={handleCheckboxChange}
        handleRemoveItem={handleRemoveItem}
        onDragEnd={onDragEnd}
      />
      <div className="flex">
        <InputText
          placeholder={addPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-1 btn bg-backgroundPrimaryDark rounded px-6 shadow"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
    </div>
  );
}
