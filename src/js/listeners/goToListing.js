export function goToListing(target) {
  const listingsID = target.id;
  window.location.href = `../listingsItem/listingsItem.html?id=${listingsID}`;
}
