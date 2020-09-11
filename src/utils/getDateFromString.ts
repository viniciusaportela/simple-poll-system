/**
 * Turn a database date format to JS Date object
 *
 * Example Input: ```2020-06-10```
 *
 * @param dateString
 */
export default function getDateFromString(dateString: string) {
  const dateParts = dateString.split("-");
  return new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );
}
