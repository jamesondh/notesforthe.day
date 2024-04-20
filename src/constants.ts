import { InputType, InputComponent } from "./types";

export const DATABASE_PREFIX = "dailies";

export const INITIAL_TEMPLATE: InputComponent[] = [
  {
    index: 0,
    type: InputType.Textarea,
    label: "What's on my mind this morning?",
    placeholder:
      "How did I sleep last night? What did I dream about? What's on my mind?",
  },
  {
    index: 1,
    type: InputType.Checkbox,
    label: "What is my mood this morning?",
    initialList: ["Tired", "Motivated", "Lazy", "Sick", "Happy", "Grumpy"],
    addPlaceholder: "Add new mood...",
  },
  {
    index: 2,
    type: InputType.Textarea,
    label: "What am I excited about today?",
    placeholder:
      "What events am I looking forward to? What recent hobbies or things am I passionate about?",
    rows: 2,
  },
  {
    index: 3,
    type: InputType.Textarea,
    label: "What's my environment today?",
    placeholder: "Where am I? What's the weather today?",
    rows: 2,
  },
  {
    index: 4,
    type: InputType.Checkbox,
    label: "What do I have scheduled today?",
    initialList: [],
    addPlaceholder: "Add new event...",
  },
  {
    index: 5,
    type: InputType.Checkbox,
    label: "What do I want to accomplish today?",
    initialList: [],
    addPlaceholder: "Add new task...",
  },
  {
    index: 6,
    type: InputType.Textarea,
    label: "What's on my mind this evening?",
    placeholder:
      "How did my day go? Did anything interesting happen? What's on my mind?",
  },
  {
    index: 7,
    type: InputType.Checkbox,
    label: "What is my mood this evening?",
    initialList: ["Tired", "Relaxed", "Sick", "Happy", "Grumpy"],
    addPlaceholder: "Add new mood...",
  },
];
