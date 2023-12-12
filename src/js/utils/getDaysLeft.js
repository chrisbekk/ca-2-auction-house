export function getDaysLeft(time) {
  // The target date in UTC format
  const targetDate = new Date(time);

  // Current date in UTC
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = targetDate - currentDate;

  // Convert milliseconds to days
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );
  return differenceInDays;
}
