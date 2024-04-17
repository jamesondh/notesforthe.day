import { useState, useEffect } from "react";
import { morningMoods } from "./constants";
import Checkboxes from "./components/checkboxes";
import DateSelector from "./components/date-selector";
import Textarea from "./components/textarea";
import InputText from "./components/input-text";
import Hr from "./components/hr";

export default function App() {
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate())
      .toISOString()
      .split("T")[0];
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [morningNotes, setMorningNotes] = useState<string>("");
  const [items, setItems] = useState<string[]>(morningMoods);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>(
    morningMoods.reduce((acc, mood) => ({ ...acc, [mood]: false }), {}),
  );

  const handleCheckboxChange = (item: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleRemoveItem = (item: string) => {
    setItems((prevItems) => prevItems.filter((x) => x !== item));
    const newState = { ...checkedState };
    delete newState[item];
    setCheckedState(newState);
  };

  const handleAddItem = (newItem: string) => {
    if (newItem && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setCheckedState((prevState) => ({ ...prevState, [newItem]: false }));
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    const savedData = localStorage.getItem(`dailies-${date}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setMorningNotes(data.morningNotes);
      setCheckedState(data.checkedState);
      setItems(Object.keys(data.checkedState));
    }
    setIsLoaded(true);
  }, [date]);

  useEffect(() => {
    if (isLoaded) {
      const saveData = { morningNotes, checkedState };
      localStorage.setItem(`dailies-${date}`, JSON.stringify(saveData));
    }
  }, [morningNotes, checkedState, isLoaded, date]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Dailies</h1>
      <DateSelector value={date} onChange={setDate} />
      <Hr />

      <h2 className="text-lg">Morning</h2>
      <p>Notes</p>
      <Textarea
        placeholder="How are you feeling today?"
        value={morningNotes}
        onChange={setMorningNotes}
      />
      <p>Mood</p>
      <InputText placeholder="Add new mood..." onKeyPress={handleAddItem} />
      <Checkboxes
        list={items}
        checkedState={checkedState}
        onChange={handleCheckboxChange}
        onRemove={handleRemoveItem}
      />
      <Hr />
    </div>
  );
}
