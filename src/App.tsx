import { useState, useEffect } from "react";
import { morningMoods } from "./constants";
import Checkboxes from "./components/checkboxes";
import Textarea from "./components/textarea";
import InputText from "./components/input-text";
import Header from "./components/header";
import Footer from "./components/footer";

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
      // load data associated with the date, if it exists in localStorage
      const data = JSON.parse(savedData);
      setMorningNotes(data.morningNotes);
      setCheckedState(data.checkedState);
      setItems(Object.keys(data.checkedState));
    } else {
      // otherwise, reset the state
      setMorningNotes("");
      setCheckedState(
        morningMoods.reduce((acc, mood) => ({ ...acc, [mood]: false }), {}),
      );
      setItems(morningMoods);
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
      <Header date={date} setDate={setDate} />

      <p>How do I feel this morning?</p>
      <Textarea
        placeholder="How did I sleep last night? What did I dream about? What's on my mind?"
        value={morningNotes}
        onChange={setMorningNotes}
      />
      <p>Morning mood</p>
      <Checkboxes
        list={items}
        checkedState={checkedState}
        onChange={handleCheckboxChange}
        onRemove={handleRemoveItem}
      />
      <InputText placeholder="Add new mood..." onKeyPress={handleAddItem} />

      <Footer />
    </div>
  );
}
