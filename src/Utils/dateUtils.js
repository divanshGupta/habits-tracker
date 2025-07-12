export function getDateShiftedBy(baseDate, days) {
  const [year, month, day] = baseDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-CA"); // returns "YYYY-MM-DD"
}
