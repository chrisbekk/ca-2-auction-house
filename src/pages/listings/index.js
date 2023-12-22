import { listingsCard } from "../../js/components/listingsCard.js";
import { getListings } from "../../js/api/getListings.js";
import { toggleNav } from "../../js/listeners/toggleNav.js";
//import { userState } from "../../js/auth/isAuth.js";
import { loginButton } from "../../js/components/navBar.js";
import {
  generatePaginationButtons,
  paginate,
} from "../../js/utils/pagination.js";

async function main() {
  try {
    const allData = await getListings();
    const itemsPerPage = 6;
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    let currentPage = 1;

    generatePaginationButtons(currentPage, itemsPerPage, totalPages, allData);
    paginate(currentPage, itemsPerPage, allData);

    const navButton = document.getElementById("nav-button");
    navButton.addEventListener("click", toggleNav);

    const listingsItems = document.querySelectorAll(".listings-item");

    listingsItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        goToListing(e.currentTarget);
      });
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

main();
