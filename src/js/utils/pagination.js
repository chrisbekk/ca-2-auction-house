import { listingsCard } from "../components/listingsCard.js";
import { goToListing } from "../listeners/goToListing.js";
export function generatePaginationButtons(
  currentPage,
  itemsPerPage,
  totalPages,
  allData,
) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear existing buttons

  const maxButtonsToShow = 5;
  const startPage = Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 1);
  const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add(
      "pagination-button",
      "py-2",
      "px-4",
      "mr-2",
      "rounded-md",
      "hover:cursor-pointer",
    );

    // Highlight the button of the current page
    if (i === currentPage) {
      button.classList.add("bg-primary-400", "text-black");
    } else {
      button.classList.add(
        "bg-white",
        "bg-opacity-20",
        "text-white",
        "hover:bg-primary-400",
        "hover:text-black",
      );
    }

    button.addEventListener("click", function () {
      // Event listener handling pagination button click
      paginate(i, itemsPerPage, allData);
    });
    paginationContainer.appendChild(button);
  }

  // Add "Previous" button
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.classList.add(
      "py-2",
      "px-4",
      "mr-2",
      "hover:bg-primary-400",
      "hover:text-black",
      "rounded",
    );
    prevButton.addEventListener("click", function () {
      paginate(currentPage - 1, itemsPerPage, allData);
    });
    paginationContainer.insertBefore(
      prevButton,
      paginationContainer.firstChild,
    );
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add(
      "py-2",
      "px-4",
      "mr-2",
      "hover:bg-primary-400",
      "hover:text-black",
      "rounded",
    );
    nextButton.addEventListener("click", function () {
      paginate(currentPage + 1, itemsPerPage, allData);
    });
    paginationContainer.appendChild(nextButton);
  }
}

export function paginate(page, itemsPerPage, allData) {
  // Your paginate logic here
  // Use the allData parameter as needed
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const contentContainer = document.getElementById("listings-container");
  contentContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < allData.length; i++) {
    contentContainer.innerHTML += listingsCard(allData[i]);
    const listingsItems = document.querySelectorAll(".listings-item");
  }

  generatePaginationButtons(
    page,
    itemsPerPage,
    Math.ceil(allData.length / itemsPerPage),
    allData,
  );
}
