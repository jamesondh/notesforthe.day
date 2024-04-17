import { useState } from "react";
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

  const resetState = () => {
    // TODO: Reset all state values by looping through labels
  };

  const handleResetDay = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all of today's notes?",
    );
    if (confirmReset) {
      resetState();
    }
  };

  return (
    <div className="container mx-auto px-2">
      <Header date={date} setDate={setDate} handleResetDay={handleResetDay} />

      <Textarea
        label="Morning notes"
        date={date}
        placeholder="How did I sleep last night? What did I dream about? What's on my mind?"
      />
      <Textarea
        label="Environment"
        date={date}
        placeholder="Where am I? What's the weather today?"
        rows={2}
      />
      <Checkboxes
        label="Morning mood"
        date={date}
        initialList={initialMorningMoods}
        addPlaceholder="Add new mood..."
      />
      <Footer />
    </div>
  );
}
