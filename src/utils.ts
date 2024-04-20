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

export function handleResetDay(date: string | null): void {
  if (!date) {
    return;
  }
  const confirmReset = window.confirm(
    "Are you sure you want to reset all of today's notes?",
  );
  if (confirmReset) {
    localStorage.removeItem(getDatabaseDateKey(date));
    localStorage.removeItem(getDatabaseDateTemplateKey(date));
    window.location.reload();
  }
}

export function handleResetTemplate(): void {
  const confirmReset = window.confirm(
    "Are you sure you want to reset your daily template to the default?",
  );
  if (confirmReset) {
    localStorage.removeItem(getDatabaseTemplateKey());
    window.location.reload();
  }
}

export function getTheme(): string {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
