import { useState } from "react";
import { CheckboxItem } from "../types";
import InputText from "./input-text";
import Checkbox from "./checkbox";
import LoadOrInitializeData from "../hooks/load-or-initialize-data";
import PushUpdateToDb from "../hooks/push-update-to-db";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface CheckboxProps {
  label: string;
  date: string;
  initialList: string[];
  addPlaceholder: string;
}

const reorder = (
  list: CheckboxItem[],
  startIndex: number,
  endIndex: number,
) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Checkboxes({
  label,
  date,
  initialList,
  addPlaceholder,
}: CheckboxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<CheckboxItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  LoadOrInitializeData({
    date,
    label,
    initialValue: initialList.map((item) => ({ name: item, checked: false })),
    setValue: setList,
    setIsLoaded,
  });
  PushUpdateToDb({ date, label, isLoaded, value: list });

  const handleCheckboxChange = (itemName: string) => {
    setList((prevState) =>
      prevState.map((mood) =>
        mood.name === itemName ? { ...mood, checked: !mood.checked } : mood,
      ),
    );
  };

  const handleRemoveItem = (itemName: string) => {
    setList((prevState) => prevState.filter((mood) => mood.name !== itemName));
  };

  const handleAddItem = () => {
    const newItem = inputValue.trim();
    if (newItem !== "") {
      // if list does not already contain the item, add it
      if (
        list.length === 0 ||
        !list.map((item) => item.name).includes(newItem)
      ) {
        setList((prevList) => [...prevList, { name: newItem, checked: false }]);
      }
      setInputValue("");
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      handleAddItem();
    }
  };

  function onDragEnd(result: DropResult) {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const reorderedList = reorder(
      list,
      result.source.index,
      result.destination.index,
    );

    setList([...reorderedList]);
  }

  return (
    <div className="mb-3">
      <p>{label}</p>
      {list && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cb">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, index) => (
                  <Checkbox
                    key={item.name}
                    index={index}
                    item={item}
                    handleCheckboxChange={handleCheckboxChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <div className="flex">
        <InputText
          placeholder={addPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-1 btn bg-black rounded px-2 border border-gray-700"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
    </div>
  );
}
