import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputType, InputComponent } from "../types";
import { handleResetDay } from "../utils";
import Checkboxes from "../components/checkboxes";
import Textarea from "../components/textarea";
import Header from "../components/header";
import Tabs from "../components/tabs";
import Schedule from "../components/schedule";
import LoadOrInitializeTemplate from "../hooks/load-or-initialize-template";
import { getNotesForDate } from "../utils";
import Markdown from "markdown-to-jsx";

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
      // if "today", set the date to today
      if (day === "today") {
        setDate(new Date().toISOString().split("T")[0]);
        return;
      }

      // if "yesterday", set the date to yesterday
      if (day === "yesterday") {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday.toISOString().split("T")[0]);
        return;
      }

      // if "tomorrow", set the date to tomorrow
      if (day === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split("T")[0]);
        return;
      }

      // otherwise, verify that the day is in the correct format
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

  function renderInputComponentsAsMarkdown(): string {
    if (!date) {
      return "Date has not been set.";
    }

    // today is an array of {label: string, value: any}
    const today = getNotesForDate(date);
    if (!today) {
      return "No notes found for today.";
    }

    // add today's date as a header
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let markdown = `# ${formattedDate}\n\n`;

    for (const inputComponent of inputComponents) {
      // find the entry in today that corresponds to this inputComponent
      const entry = JSON.parse(today).find(
        (item: { label: string }) => item.label === inputComponent.label,
      );

      // skip if the value is empty or has an array length of 0
      if (!entry || !entry.value) {
        continue;
      }
      if (Array.isArray(entry.value) && entry.value.length === 0) {
        continue;
      }

      // add the inputComponent label as a header
      markdown += `## ${inputComponent.label}\n\n`;

      // render text as-is, and checkboxes as a markdown todo list
      switch (inputComponent.type) {
        case InputType.Textarea:
          markdown += `${entry.value}\n\n`;
          break;
        case InputType.Checkbox:
          // continue if the value is empty
          if (!entry.value.length) {
            break;
          }

          // create a checkbox list for each item
          for (const item of entry.value) {
            markdown += `- [${item.checked ? "x" : " "}] ${item.name}\n`;
          }
          markdown += "\n";
          break;
        default:
          break;
      }
    }

    // console.log(markdown);
    return markdown;
  }

  return (
    <>
      {date && (
        <Header date={date} setDate={setDate} handleResetDay={handleResetDay} />
      )}
      <Tabs
        tabsData={[
          {
            label: "Edit ✍️",
            content: () =>
              inputComponents.map((item, index) =>
                renderInputComponent(item, index),
              ),
          },
          {
            label: "View 📖",
            content: () => (
              <div className="markdown">
                <Markdown>{renderInputComponentsAsMarkdown()}</Markdown>
              </div>
            ),
          },
          {
            label: "Calendar 🗓️",
            content: <Schedule />,
          },
        ]}
      />
    </>
  );
}
