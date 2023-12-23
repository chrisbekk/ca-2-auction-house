import { listingsCard } from "../../js/components/listingsCard.js";
import { getListings } from "../../js/api/getListings.js";
import { toggleNav } from "../../js/listeners/toggleNav.js";
//import { userState } from "../../js/auth/isAuth.js";
import { loginButton } from "../../js/components/navBar.js";
import { logIn } from "../../js/listeners/logIn.js";
import { formValidation } from "../../js/validation/formValidation.js";
import { closeModal } from "../../js/listeners/closeModal.js";
import { getItem } from "../../js/storage/getItem.js";
import {
  generatePaginationButtons,
  paginate,
} from "../../js/utils/pagination.js";
import { queryParam } from "../../js/utils/queryParam.js";
import { goToListing } from "../../js/listeners/goToListing.js";

const loginBtn = document.getElementById("login-button");
loginBtn.addEventListener("click", logIn);

formValidation("login-form");

const closeLoginBtn = document.getElementById("close-login-modal");
closeLoginBtn.addEventListener("click", () => closeModal("login-modal"));

const loginModalOverlay = document.getElementById("login-modal");
loginModalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal("login-modal");
    document.getElementById("login-feedback").innerText = "";
  } else {
    return;
  }
});

async function main() {
  try {
    const allData = await getListings();
    const itemsPerPage = 6;
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    let currentPage = 1;

    let searchTerm = queryParam("search");
    console.log(searchTerm);
    if (searchTerm !== null) {
      const searchTermToLower = searchTerm.toLowerCase();
      const filteredArray = allData.filter((listing) => {
        return listing.title.toLowerCase().includes(searchTermToLower);
      });

      if (filteredArray.length === 0) {
        const listingsContainer = document.getElementById("listings-container");
        const message = document.createElement("p");
        message.textContent = "Could not find any listings.";
        message.classList.add("text-center", "text-xl");
        listingsContainer.append(message);
      } else {
        generatePaginationButtons(
          currentPage,
          itemsPerPage,
          totalPages,
          filteredArray,
        );
        paginate(currentPage, itemsPerPage, filteredArray);
      }
    } else {
      generatePaginationButtons(currentPage, itemsPerPage, totalPages, allData);
      paginate(currentPage, itemsPerPage, allData);
    }

    const navButton = document.getElementById("nav-button");
    navButton.addEventListener("click", toggleNav);

    const listingsItems = document.querySelectorAll(".listings-item");
    console.log(getItem("user"));
    if (getItem("user") !== null) {
      listingsItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          goToListing(e.currentTarget);
        });
      });
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

main();
