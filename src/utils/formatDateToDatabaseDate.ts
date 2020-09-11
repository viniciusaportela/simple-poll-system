/**
 * Turn a JS Date Object into a compatible date format
 * with database
 *
 * Example Output: ```2020-09-10```
 *
 * @param date - Javascript Date Object
 */
export default function formatDateToDatabaseDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
