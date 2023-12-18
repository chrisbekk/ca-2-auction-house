import { getItem } from "../../js/storage/getItem.js";
import { getUser } from "../../js/api/getUser.js";
import { formatDate } from "../../js/utils/formatDate.js";
import { openModal } from "../../js/listeners/openModal.js";
import { closeModal } from "../../js/listeners/closeModal.js";
async function main() {
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const creditsElement = document.getElementById("credits");
  const avatarElement = document.getElementById("avatar");

  const listingsContainer = document.getElementById("listings-container");
  try {
    const userData = getItem("user");
    const { name, email, credits, avatar, accessToken } = userData;
    const user = await getUser(name, accessToken);
    console.log(user);
    console.log(userData);
    const { listings } = user;

    avatarElement.src =
      avatar === "" ? "../../../public/assets/profile-placeholder.jpg" : avatar;
    usernameElement.textContent = name;
    emailElement.textContent = email;
    creditsElement.textContent = `Credits: ${credits}`;
    listingsDetails(listings);
  } catch (error) {
    console.log(error);
  }
}

main();
const openAvatarBtn = document.getElementById("open-avatar-modal");
openAvatarBtn.addEventListener("click", () => openModal("avatar-modal"));

const closeLoginBtn = document.getElementById("close-avatar-modal");
closeLoginBtn.addEventListener("click", () => closeModal("login-modal"));

const loginModalOverlay = document.getElementById("avatar-modal");
loginModalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal("avatar-modal");
  } else {
    return;
  }
});

function listingsDetails(listings) {
  console.log(listings);
  if (listings.length === 0) {
    console.log("No Listings");
  } else {
    listings.forEach((listing) => {
      const list = document.createElement("ul");
      list.innerHTML = `              
        <li class="font-mono font-thin text-sm sm:text-sm">
            ${formatDate(listing.created)}
        </li>
        <li class="font-mono font-thin text-sm sm:text-sm">
            Ended
        </li>
        <li class="font-mono font-thin text-sm sm:text-sm">
            ${listing[_count].bids}
        </li>
        <li class="font-mono font-thin text-sm sm:text-sm">
            USD 130
        </li>`;
    });
  }
}
