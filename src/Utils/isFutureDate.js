export function isFutureDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Midnight today

  const [year, month, day] = dateStr.split("-").map(Number);
  const compareDate = new Date(year, month - 1, day); // safe from timezone bugs

  return compareDate > today;
}
