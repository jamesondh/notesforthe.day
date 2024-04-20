import { useEffect } from "react";
import { getDatabaseTemplateKey } from "../utils";
import { InputComponent, InputType } from "../types";

interface PushTemplateUpdateToDbProps {
  inputType: InputType;
  index: number;
  label: string;
  placeholderText: string;
  addPlaceholderText: string;
  sliderValue: number;
  list: string[];
}

// TODO: only push to db if value has changed
export default function PushTemplateUpdateToDb({
  inputType,
  index,
  label,
  placeholderText,
  addPlaceholderText,
  sliderValue,
  list,
}: PushTemplateUpdateToDbProps) {
  useEffect(() => {
    // console.log(
    //   "Pushing to db",
    //   label,
    //   placeholderText,
    //   addPlaceholderText,
    //   sliderValue,
    //   list,
    // );

    // return early if cannot get db entry
    const templateFromDb = localStorage.getItem(getDatabaseTemplateKey());
    if (!templateFromDb) return;
    const template: InputComponent[] = JSON.parse(templateFromDb);
    // console.log("got template", template);

    // get input component in template with the same index
    const inputComponent = template.find(
      (template: { index: number }) => template.index === index,
    );
    // console.log("found input component", inputComponent);
    if (!inputComponent) return;

    // update the input component with the new values
    inputComponent.label = label;
    switch (inputType) {
      case InputType.Textarea:
        inputComponent.placeholder = placeholderText;
        inputComponent.rows = sliderValue;
        break;
      case InputType.Checkbox:
        inputComponent.addPlaceholder = addPlaceholderText;
        inputComponent.initialList = list;
        break;
    }
    // console.log("updated input component", inputComponent);

    // replace the old input component with the updated one in the template
    const updatedTemplate = template.map((template: { index: number }) =>
      template.index === index ? inputComponent : template,
    );
    // console.log("updated template", updatedTemplate);

    // push the updated template to the db
    localStorage.setItem(
      getDatabaseTemplateKey(),
      JSON.stringify(updatedTemplate),
    );
  }, [label, placeholderText, addPlaceholderText, sliderValue, list]);
}
