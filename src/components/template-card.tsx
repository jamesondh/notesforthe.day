import { useState } from "react";
import { InputType } from "../types";
import InputText from "./input-text";
import CheckboxesTemplate from "./checkboxes-template";
import PushTemplateUpdateToDb from "../hooks/push-template-update-to-db";

interface TemplateCardProps {
  inputType: InputType;
  index: number;
  initialLabel?: string;
  initialPlaceholder?: string;
  initialRows?: number;
  initialAddPlaceholder?: string;
  initialList?: string[];
}

export default function TemplateCard({
  inputType,
  index,
  initialLabel = "",
  initialPlaceholder = "",
  initialRows = 4,
  initialAddPlaceholder = "",
  initialList = [],
}: TemplateCardProps) {
  const [label, setLabel] = useState<string>(initialLabel);
  const [placeholderText, setPlaceholderText] =
    useState<string>(initialPlaceholder);
  const [addPlaceholderText, setAddPlaceholderText] = useState<string>(
    initialAddPlaceholder,
  );
  const [sliderValue, setSliderValue] = useState<number>(initialRows);
  const [list] = useState<string[]>(initialList);

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
    <div className="bg-backgroundPrimaryDark rounded-lg shadow-lg p-4 mb-2">
      <div className="flex justify-between items-center">
        <p className="text-xl">
          {inputType === InputType.Textarea ? "Text input" : "Checkbox input"}
        </p>
        <button className="text-sm text-gray-500">Remove</button>
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
        backgroundColor="bg-backgroundPrimaryDarker"
      />

      {inputType === InputType.Textarea ? (
        <>
          <p className="mt-2">Placeholder text</p>
          <InputText
            placeholder="Type placeholder text here..."
            value={placeholderText}
            onChange={setPlaceholderText}
            backgroundColor="bg-backgroundPrimaryDarker"
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
            backgroundColor="bg-backgroundPrimaryDarker"
          />
          <p className="mt-2">Default items</p>
          <CheckboxesTemplate
            initialList={list}
            addPlaceholder={"Add new default item..."}
          />
        </>
      )}
    </div>
  );
}
