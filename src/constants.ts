import { InputType, InputComponent } from "./types";

export const initialInputComponents: InputComponent[] = [
  {
    type: InputType.Textarea,
    label: "What's on my mind this morning?",
    placeholder:
      "How did I sleep last night? What did I dream about? What's on my mind?",
  },
  {
    type: InputType.Checkbox,
    label: "What is my mood this morning?",
    initialList: ["Tired", "Motivated", "Lazy", "Sick", "Happy", "Grumpy"],
    addPlaceholder: "Add new mood...",
  },
  {
    type: InputType.Textarea,
    label: "What am I excited about today",
    placeholder:
      "What events am I looking forward to? What recent hobbies or things am I passionate about?",
    rows: 2,
  },
  {
    type: InputType.Textarea,
    label: "What's my environment today?",
    placeholder: "Where am I? What's the weather today?",
    rows: 2,
  },
  {
    type: InputType.Checkbox,
    label: "What do I have scheduled today?",
    initialList: [],
    addPlaceholder: "Add new event...",
  },
  {
    type: InputType.Checkbox,
    label: "What do I want to accomplish today?",
    initialList: [],
    addPlaceholder: "Add new task...",
  },
  {
    type: InputType.Textarea,
    label: "What's on my mind this evening?",
    placeholder:
      "How did my day go? Did anything interesting happen? What's on my mind?",
  },
  {
    type: InputType.Checkbox,
    label: "What is my mood this evening?",
    initialList: ["Tired", "Relaxed", "Sick", "Happy", "Grumpy"],
    addPlaceholder: "Add new mood...",
  },
];
