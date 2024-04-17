export interface CheckboxItem {
  name: string;
  checked: boolean;
}

export enum InputType {
  Textarea,
  Checkbox,
}

export interface InputComponent {
  type: InputType;
  label: string;
  placeholder?: string;
  rows?: number;
  initialList?: string[];
  addPlaceholder?: string;
}
