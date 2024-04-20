import { useState } from "react";
import { InputType } from "../types";
import InputText from "./input-text";
import CheckboxesTemplate from "./checkboxes-template";

interface TemplateCardProps {
  inputType: InputType;
}

export default function TemplateCard({ inputType }: TemplateCardProps) {
  const [label, setLabel] = useState<string>("");

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  return (
    <div className="bg-backgroundPrimaryDarker rounded-lg shadow-lg p-4 mb-2">
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
        onKeyPress={handleKeyPress}
      />

      {inputType === InputType.Textarea ? (
        <>
          <p className="mt-2">Placeholder text</p>
          <InputText
            placeholder="Type placeholder text here..."
            value={label}
            onChange={setLabel}
            onKeyPress={handleKeyPress}
          />
          <p className="mt-2">Rows</p>
          <input
            className="w-full"
            type="range"
            min="1"
            max="20"
            value="4"
          ></input>
        </>
      ) : (
        <>
          <p className="mt-2">Placeholder text for add item</p>
          <InputText
            placeholder="Type placeholder text for add item here..."
            value={label}
            onChange={setLabel}
            onKeyPress={handleKeyPress}
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
