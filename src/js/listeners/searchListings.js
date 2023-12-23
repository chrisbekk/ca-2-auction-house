export function searchListings() {
  const search = document.getElementById("search");
  console.log(search);
  if (search.value.trim() === "") {
    return;
  } else {
    window.location.href = `./listings.html?search=${search.value}`;
  }
}
