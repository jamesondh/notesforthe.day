import React from "react";

export interface CheckboxItem {
  name: string;
  checked: boolean;
}

export enum InputType {
  Textarea,
  Checkbox,
}

export interface InputComponent {
  index: number;
  type: InputType;
  label: string;
  placeholder?: string;
  rows?: number;
  initialList?: string[];
  addPlaceholder?: string;
}

export interface TabData {
  label: string;
  content: React.ReactNode;
}
