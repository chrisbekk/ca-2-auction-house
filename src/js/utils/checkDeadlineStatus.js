export function checkDeadlineStatus(endsAt) {
  const currentDate = new Date();
  const deadlineDate = new Date(endsAt);

  if (currentDate < deadlineDate) {
    return "Active";
  } else {
    return "Ended";
  }
}
