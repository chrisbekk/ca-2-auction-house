export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { month: "long", day: "numeric", year: "numeric" };

  return date.toLocaleDateString(undefined, options);
}
