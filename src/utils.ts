import { CheckboxItem } from "./types";
import { DATABASE_PREFIX } from "./constants";

function getDatabaseDateKey(date: string): string {
  return `${DATABASE_PREFIX}-${date}`;
}

function getDatabaseDateTemplateKey(date: string): string {
  return `${DATABASE_PREFIX}-${date}-template`;
}

function getDatabaseTemplateKey(): string {
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

export function setTheme(theme: string): void {
  localStorage.setItem("theme", theme);
}

// TODO: replace this with routing
export function getActiveTab(): number {
  const storedActiveTab = localStorage.getItem("activeTab");
  if (storedActiveTab) {
    return parseInt(storedActiveTab);
  }

  return 0;
}

export function setActiveTab(index: number): void {
  localStorage.setItem("activeTab", index.toString());
}

export function getNotesForDate(date: string): string | null {
  return localStorage.getItem(getDatabaseDateKey(date));
}

export function setNotesForDate(date: string, notes: string): void {
  localStorage.setItem(getDatabaseDateKey(date), notes);
}

export function getTemplateForDate(date: string): string | null {
  return localStorage.getItem(getDatabaseDateTemplateKey(date));
}

export function setTemplateForDate(date: string, template: string): void {
  localStorage.setItem(getDatabaseDateTemplateKey(date), template);
}

export function getTemplate(): string | null {
  return localStorage.getItem(getDatabaseTemplateKey());
}

export function setTemplate(template: string): void {
  localStorage.setItem(getDatabaseTemplateKey(), template);
}
