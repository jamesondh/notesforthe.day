import { CheckboxItem } from "./types";
import { DATABASE_PREFIX } from "./constants";

export function getDatabaseDateKey(date: string): string {
  return `${DATABASE_PREFIX}-${date}`;
}

export function getDatabaseDateTemplateKey(date: string): string {
  return `${DATABASE_PREFIX}-${date}-template`;
}

export function getDatabaseTemplateKey(): string {
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
