import { useState } from "react";
import Header from "../components/header";
import TemplateCard from "../components/template-card";
import { InputType, InputComponent } from "../types";
import LoadOrInitializeTemplate from "../hooks/load-or-initialize-template";
import { handleResetTemplate, getDatabaseTemplateKey } from "../utils";

export default function EditTemplate() {
  const [inputComponents, setInputComponents] = useState<InputComponent[]>([]);

  LoadOrInitializeTemplate({
    setValue: setInputComponents,
  });

  const handleAddTextInput = () => {
    // append a new text input to the inputComponents state
    setInputComponents((prev) => [
      ...prev,
      {
        index: prev.length,
        type: InputType.Textarea,
        label: "",
        placeholder: "",
        rows: 4,
      },
    ]);
    // add the new text input to the local storage
    const templateFromDb = localStorage.getItem(getDatabaseTemplateKey());
    if (!templateFromDb) return;
    const template: InputComponent[] = JSON.parse(templateFromDb);

    template.push({
      index: template.length,
      type: InputType.Textarea,
      label: "",
      placeholder: "",
      rows: 4,
    });
    localStorage.setItem(getDatabaseTemplateKey(), JSON.stringify(template));
  };

  const handleAddCheckboxInput = () => {
    // append a new checkbox input to the inputComponents state
    setInputComponents((prev) => [
      ...prev,
      {
        index: prev.length,
        type: InputType.Checkbox,
        label: "",
        initialList: [],
        addPlaceholder: "",
      },
    ]);
    // add the new checkbox input to the local storage
    const templateFromDb = localStorage.getItem(getDatabaseTemplateKey());
    if (!templateFromDb) return;
    const template: InputComponent[] = JSON.parse(templateFromDb);

    template.push({
      index: template.length,
      type: InputType.Checkbox,
      label: "",
      initialList: [],
      addPlaceholder: "",
    });
    localStorage.setItem(getDatabaseTemplateKey(), JSON.stringify(template));
  };

  const renderTemplate = () => {
    return inputComponents.map((inputComponent, index) => {
      switch (inputComponent.type) {
        case InputType.Textarea:
          return (
            <TemplateCard
              key={index}
              index={index}
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
              index={index}
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
      <Header handleResetTemplate={handleResetTemplate} />
      <div>
        <p className="my-8 text-center">
          Edit your daily template here. This template is only applied to new
          days.
        </p>
        {renderTemplate()}
        <div className="flex justify-between my-4">
          <button
            className="w-full btn bg-backgroundPrimaryDark rounded p-3 mr-1 shadow-lg"
            onClick={handleAddTextInput}
          >
            Add text input
          </button>
          <button
            className="w-full btn bg-backgroundPrimaryDark rounded p-3 ml-1 shadow-lg"
            onClick={handleAddCheckboxInput}
          >
            Add checkbox input
          </button>
        </div>
      </div>
    </>
  );
}
