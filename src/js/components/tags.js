export function tags(tagsArray) {
  const tagsContainer = document.getElementById("tags");
  tagsArray.forEach((tag) => {
    if (tags.length === 0) {
      tagsContainer.innerHTML = `<div class="rounded-md bg-teal-500 text-[12px] py-1 px-2 mr-1 max-w-[100px] truncate">No tags</div>`;
    } else {
      tagsContainer.innerHTML += `<div class="rounded-md bg-teal-500 text-[12px] py-1 px-2 mr-1 max-w-[100px] truncate">${tag}</div>`;
    }
  });
}
