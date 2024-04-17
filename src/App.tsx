import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { initialInputComponents } from "./constants";
import { InputType, InputComponent } from "./types";
import { getDatabaseKey } from "./utils";
import Checkboxes from "./components/checkboxes";
import Textarea from "./components/textarea";
import Header from "./components/header";
import Footer from "./components/footer";

export default function App() {
  const RouterComponent = () => {
    const { day } = useParams();
    const [date, setDate] = useState(
      day || new Date().toISOString().split("T")[0],
    );

    useEffect(() => {
      if (day) {
        setDate(day);
      }
    }, [day]);

    const resetState = () => {
      for (const inputComponent of initialInputComponents) {
        const key = getDatabaseKey(date, inputComponent.label);
        console.log("Attempting to remove", key);
        switch (inputComponent.type) {
          case InputType.Textarea:
            localStorage.removeItem(key);
            break;
          case InputType.Checkbox:
            localStorage.removeItem(key);
            break;
          default:
            break;
        }
      }
      // TODO: trigger a re-render of input components instead of reloading the page
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
      <div className="container mx-auto px-2">
        <Header date={date} setDate={setDate} handleResetDay={handleResetDay} />
        {initialInputComponents.map((item, index) =>
          renderInputComponent(item, index),
        )}
        <Footer />
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<RouterComponent />} />
      <Route path="/:day" element={<RouterComponent />} />
    </Routes>
  );
}
