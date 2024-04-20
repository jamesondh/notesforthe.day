import { CheckboxItem } from "./types";

export function getDatabaseKey(date: string, label: string) {
  return `dailies-${date}-${label}`;
}

export function reorder(
  list: CheckboxItem[],
  startIndex: number,
  endIndex: number,
): CheckboxItem[] {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
