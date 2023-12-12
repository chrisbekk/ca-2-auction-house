export function searchListings() {
  const search = document.getElementById("search");
  console.log(search);
  if (search.value.trim() === "") {
    return;
  } else {
    window.location.href = `src/pages/listings/listings.html?search=${search.value}`;
  }
}
