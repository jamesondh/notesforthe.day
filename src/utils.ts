import { CheckboxItem } from "./types";
import { DATABASE_PREFIX } from "./constants";

export function getDatabaseKey(date: string, label: string) {
  return `${DATABASE_PREFIX}-${date}-${label}`;
}

export function getDatabaseTemplateKey() {
  return `${DATABASE_PREFIX}-template`;
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
