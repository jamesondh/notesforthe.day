import { useState } from "react";
import Header from "../components/header";
import TemplateCard from "../components/template-card";
import { InputType, InputComponent } from "../types";
import LoadOrInitializeTemplate from "../hooks/load-or-initialize-template";

export default function EditTemplate() {
  const [inputComponents, setInputComponents] = useState<InputComponent[]>([]);

  LoadOrInitializeTemplate({
    setValue: setInputComponents,
  });

  const renderTemplate = () => {
    return inputComponents.map((inputComponent, index) => {
      switch (inputComponent.type) {
        case InputType.Textarea:
          return (
            <TemplateCard
              key={index}
              inputType={InputType.Textarea}
              initialLabel={inputComponent.label}
              initialPlaceholder={inputComponent.placeholder}
              initialRows={inputComponent.rows}
            />
          );
        case InputType.Checkbox:
          return (
            <TemplateCard
              key={index}
              inputType={InputType.Checkbox}
              initialLabel={inputComponent.label}
              initialList={inputComponent.initialList}
              initialAddPlaceholder={inputComponent.addPlaceholder}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <Header />
      <div>
        <p className="mb-10 mt-8 text-center">
          Under construction! Doesn't work yet 😅
        </p>
        {/* <TemplateCard inputType={InputType.Textarea} />
        <TemplateCard inputType={InputType.Checkbox} /> */}
        {renderTemplate()}
        <div className="flex justify-between my-6">
          <button className="w-full btn bg-backgroundPrimaryDark rounded p-3 mr-1 shadow-lg">
            Add text input
          </button>
          <button className="w-full btn bg-backgroundPrimaryDark rounded p-3 ml-1 shadow-lg">
            Add checkbox input
          </button>
        </div>
      </div>
    </>
  );
}
