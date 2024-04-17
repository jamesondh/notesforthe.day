export function getDatabaseKey(date: string, label: string) {
  return `dailies-${date}-${label}`;
}
