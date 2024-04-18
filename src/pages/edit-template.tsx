import Header from "../components/header";
import TemplateCard from "../components/template-card";
import { InputType } from "../types";

export default function EditTemplate() {
  return (
    <>
      <Header />
      <div>
        <p className="mb-10 mt-8 text-center">
          Under construction! Doesn't work yet 😅
        </p>
        <TemplateCard inputType={InputType.Textarea} />
        <TemplateCard inputType={InputType.Checkbox} />
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
