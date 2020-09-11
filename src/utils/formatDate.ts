export default function formatDate(dateInput: string | Date) {
  let date;

  if (typeof dateInput === "string") {
    const dateParts = dateInput.split("-");
    date = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );
  } else {
    date = dateInput;
  }

  console.log("date ", date);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(4, "0");

  return `${day}/${month}/${year}`;
}
