import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputType, InputComponent } from "../types";
import { getDatabaseDateKey, getDatabaseDateTemplateKey } from "../utils";
import Checkboxes from "../components/checkboxes";
import Textarea from "../components/textarea";
import Header from "../components/header";
import LoadOrInitializeTemplate from "../hooks/load-or-initialize-template";

export default function Home() {
  const { day } = useParams();

  const [date, setDate] = useState<string | null>(null);
  const [inputComponents, setInputComponents] = useState<InputComponent[]>([]);

  LoadOrInitializeTemplate({
    date,
    setValue: setInputComponents,
  });

  useEffect(() => {
    if (day) {
      // verify that the day is in the correct format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(day)) {
        window.location.href = "/404";
      } else {
        setDate(day);
      }
    } else {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [day]);

  const resetState = () => {
    if (!date) {
      return;
    }
    localStorage.removeItem(getDatabaseDateKey(date));
    localStorage.removeItem(getDatabaseDateTemplateKey(date));
    window.location.reload();
  };

  const handleResetDay = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all of today's notes?",
    );
    if (confirmReset) {
      resetState();
    }
  };

  const renderInputComponent = (
    inputComponent: InputComponent,
    key: number,
  ) => {
    if (!date) {
      return null;
    }

    switch (inputComponent.type) {
      case InputType.Textarea:
        if (!inputComponent.placeholder) {
          return null;
        }
        return (
          <Textarea
            key={key}
            label={inputComponent.label}
            date={date}
            placeholder={inputComponent.placeholder ?? undefined}
            rows={inputComponent.rows}
          />
        );
      case InputType.Checkbox:
        if (!inputComponent.initialList || !inputComponent.addPlaceholder) {
          return null;
        }
        return (
          <Checkboxes
            key={key}
            label={inputComponent.label}
            date={date}
            initialList={inputComponent.initialList}
            addPlaceholder={inputComponent.addPlaceholder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {date && (
        <Header date={date} setDate={setDate} handleResetDay={handleResetDay} />
      )}
      {inputComponents.map((item, index) => renderInputComponent(item, index))}
    </>
  );
}
