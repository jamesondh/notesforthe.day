import { useState } from "react";
import { InputType } from "../types";
import InputText from "./input-text";
import CheckboxesTemplate from "./checkboxes-template";
import PushTemplateUpdateToDb from "../hooks/push-template-update-to-db";
import { CheckboxItem } from "../types";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils";

interface TemplateCardProps {
  inputType: InputType;
  index: number;
  initialLabel?: string;
  initialPlaceholder?: string;
  initialRows?: number;
  initialAddPlaceholder?: string;
  initialList?: string[];
  handleRemoveInputComponent?: () => void;
}

export default function TemplateCard({
  inputType,
  index,
  initialLabel = "",
  initialPlaceholder = "",
  initialRows = 4,
  initialAddPlaceholder = "",
  initialList = [],
  handleRemoveInputComponent,
}: TemplateCardProps) {
  const [label, setLabel] = useState<string>(initialLabel);
  const [placeholderText, setPlaceholderText] =
    useState<string>(initialPlaceholder);
  const [addPlaceholderText, setAddPlaceholderText] = useState<string>(
    initialAddPlaceholder,
  );
  const [sliderValue, setSliderValue] = useState<number>(initialRows);
  const [list, setList] = useState<CheckboxItem[]>(() =>
    initialList.map((item) => ({ name: item, checked: false })),
  );
  const [inputValue, setInputValue] = useState<string>("");

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

  PushTemplateUpdateToDb({
    inputType,
    index,
    label,
    placeholderText,
    addPlaceholderText,
    sliderValue,
    list,
  });

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value));
  };

  return (
    <div className="bg-backgroundPrimaryDark rounded-lg shadow p-4 mb-2">
      <div className="flex justify-between items-center">
        <p className="text-xl">
          {inputType === InputType.Textarea ? "Text" : "Checkboxes"}
        </p>
        <button
          className="text-sm text-foregroundSecondary"
          onClick={handleRemoveInputComponent}
        >
          Remove
        </button>
      </div>
      <p className="mt-2">Label</p>
      <InputText
        placeholder={
          inputType === InputType.Textarea
            ? "Name this text input..."
            : "Name this checkbox input..."
        }
        value={label}
        onChange={setLabel}
        backgroundColor="bg-backgroundPrimary"
        outline={label === ""}
      />

      {inputType === InputType.Textarea ? (
        <>
          <p className="mt-2">Placeholder text</p>
          <InputText
            placeholder="Type placeholder text here..."
            value={placeholderText}
            onChange={setPlaceholderText}
            backgroundColor="bg-backgroundPrimary"
            outline={placeholderText === ""}
          />
          <p className="mt-2">Rows: {sliderValue}</p>
          <input
            className="w-full"
            type="range"
            min="1"
            max="10"
            value={sliderValue}
            onChange={handleSliderChange}
          ></input>
        </>
      ) : (
        <>
          <p className="mt-2">Placeholder text for add item</p>
          <InputText
            placeholder="Type placeholder text for add item here..."
            value={addPlaceholderText}
            onChange={setAddPlaceholderText}
            backgroundColor="bg-backgroundPrimary"
            outline={addPlaceholderText === ""}
          />
          <p className="mt-2">Default items</p>
          <CheckboxesTemplate
            list={list}
            addPlaceholder={"Add new default item..."}
            inputValue={inputValue}
            handleRemoveItem={handleRemoveItem}
            onDragEnd={onDragEnd}
            setInputValue={setInputValue}
            handleAddItem={handleAddItem}
            handleKeyPress={handleKeyPress}
          />
        </>
      )}
    </div>
  );
}
