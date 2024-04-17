import { useState, useEffect } from "react";
import { checkboxItem } from "./types";
import { initialMorningMoods } from "./constants";
import Checkboxes from "./components/checkboxes";
import Textarea from "./components/textarea";
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
  const [morningMoods, setMorningMoods] = useState<checkboxItem[]>(
    initialMorningMoods.map((mood) => ({ name: mood, checked: false })),
  );
  const [environmentNotes, setEnvironmentNotes] = useState<string>("");

  const handleMorningMoodCheckboxChange = (itemName: string) => {
    setMorningMoods((prevState) =>
      prevState.map((mood) =>
        mood.name === itemName ? { ...mood, checked: !mood.checked } : mood,
      ),
    );
  };

  const handleMorningMoodRemoveItem = (itemName: string) => {
    setMorningMoods((prevState) =>
      prevState.filter((mood) => mood.name !== itemName),
    );
  };

  const handleMorningMoodAddItem = (newItem: string) => {
    if (newItem && !morningMoods.some((mood) => mood.name === newItem)) {
      setMorningMoods((prevMoods) => [
        ...prevMoods,
        { name: newItem, checked: false },
      ]);
    }
  };

  const resetState = () => {
    setMorningNotes("");
    setEnvironmentNotes("");
    setMorningMoods(
      initialMorningMoods.map((mood) => ({ name: mood, checked: false })),
    );
  };

  const handleResetDay = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all of today's notes?",
    );
    if (confirmReset) {
      resetState();
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    const savedData = localStorage.getItem(`dailies-${date}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setMorningNotes(data.morningNotes);
      setEnvironmentNotes(data.environmentNotes);
      setMorningMoods(
        data.morningMoods ||
          initialMorningMoods.map((mood) => ({ name: mood, checked: false })),
      );
    } else {
      resetState();
    }
    setIsLoaded(true);
  }, [date]);

  useEffect(() => {
    if (isLoaded) {
      const saveData = { morningNotes, environmentNotes, morningMoods };
      localStorage.setItem(`dailies-${date}`, JSON.stringify(saveData));
    }
  }, [morningNotes, environmentNotes, morningMoods, isLoaded, date]);

  return (
    <div className="container mx-auto px-2">
      <Header date={date} setDate={setDate} handleResetDay={handleResetDay} />

      <Textarea
        label="Morning notes"
        placeholder="How did I sleep last night? What did I dream about? What's on my mind?"
        value={morningNotes}
        onChange={setMorningNotes}
      />
      <Textarea
        label="Environment"
        placeholder="Where am I? What's the weather today?"
        value={environmentNotes}
        onChange={setEnvironmentNotes}
        rows={2}
      />
      <Checkboxes
        label="Morning mood"
        list={morningMoods}
        onCheck={handleMorningMoodCheckboxChange}
        onRemove={handleMorningMoodRemoveItem}
        onAdd={handleMorningMoodAddItem}
        addPlaceholder="Add new mood..."
      />
      <Footer />
    </div>
  );
}
