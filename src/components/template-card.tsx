import { useState } from "react";
import { InputType } from "../types";
import InputText from "./input-text";
import CheckboxesTemplate from "./checkboxes-template";

interface TemplateCardProps {
  inputType: InputType;
}

export default function TemplateCard({ inputType }: TemplateCardProps) {
  const [label, setLabel] = useState<string>("");
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [addPlaceholderText, setAddPlaceholderText] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(4);

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
            initialList={["my", "initial", "list"]}
            addPlaceholder={"Add new default item..."}
          />
        </>
      )}
    </div>
  );
}
