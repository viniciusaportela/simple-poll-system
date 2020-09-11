import getDateFromString from "./getDateFromString";

/**
 * Format a given date to Brazil Date Standard
 *
 * Output Example: ```10/09/2020```
 *
 * @param dateInput
 */
export default function formatDate(dateInput: string | Date) {
  const date =
    typeof dateInput === "string" ? getDateFromString(dateInput) : dateInput;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(4, "0");

  return `${day}/${month}/${year}`;
}
