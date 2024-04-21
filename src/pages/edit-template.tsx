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

  const handleRemoveInputComponent = (index: number) => {
    // remove the input component at the given index from the inputComponents state
    const newInputComponents = inputComponents.filter((_, i) => i !== index);

    // reindex the input components
    newInputComponents.forEach((inputComponent, index) => {
      inputComponent.index = index;
    });
    console.log("newInputComponents", newInputComponents);

    // update the inputComponents state
    setInputComponents(newInputComponents);

    // remove the input component at the given index from the local storage
    const templateFromDb = localStorage.getItem(getDatabaseTemplateKey());
    if (!templateFromDb) return;
    const template: InputComponent[] = JSON.parse(templateFromDb);

    const newTemplate = template.filter((_, i) => i !== index);

    // reindex the input components
    newTemplate.forEach((inputComponent, index) => {
      inputComponent.index = index;
    });

    // update the local storage
    localStorage.setItem(getDatabaseTemplateKey(), JSON.stringify(newTemplate));

    // TODO: we shouldn't reload the page here, but refreshing the input component state isn't quite working
    window.location.reload();
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
              handleRemoveInputComponent={() =>
                handleRemoveInputComponent(index)
              }
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
              handleRemoveInputComponent={() =>
                handleRemoveInputComponent(index)
              }
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
          Edit your daily template here. This template is only applied to new or
          reset days.
        </p>
        {renderTemplate()}
        <div className="flex justify-between my-4">
          <button
            className="w-full btn bg-backgroundPrimaryDark rounded p-3 mr-1 shadow"
            onClick={handleAddTextInput}
          >
            Add text section
          </button>
          <button
            className="w-full btn bg-backgroundPrimaryDark rounded p-3 ml-1 shadow"
            onClick={handleAddCheckboxInput}
          >
            Add checkboxes section
          </button>
        </div>
      </div>
    </>
  );
}
