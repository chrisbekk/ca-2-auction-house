import { getItem } from "../../js/storage/getItem.js";
import { getUser } from "../../js/api/getUser.js";
import { formatDate } from "../../js/utils/formatDate.js";
import { openModal } from "../../js/listeners/openModal.js";
import { closeModal } from "../../js/listeners/closeModal.js";
import { loginButton } from "../../js/components/navBar.js";
import { toggleNav } from "../../js/listeners/toggleNav.js";
import { updateAvatar } from "../../js/api/updateAvatar.js";
import { createListing } from "../../js/api/createListing.js";
async function main() {
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const creditsElement = document.getElementById("credits");
  const avatarElement = document.getElementById("avatar");
  const navButton = document.getElementById("nav-button");
  const listingsContainer = document.getElementById("listings-container");
  const openAvatarModal = document.getElementById("open-avatar-modal");

  try {
    navButton.addEventListener("click", toggleNav);
    openAvatarModal.addEventListener("click", () => {
      const avatarModal = document.getElementById("avatar-modal");
      const closeBtn = document.getElementById("avatar-close");
      const updateAvatarBtn = document.getElementById("update-button");
      updateAvatarBtn.addEventListener("click", submitAvatar);
      avatarModal.classList.remove("hidden");
      avatarModal.classList.add("flex");
      avatarModal.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          avatarModal.classList.remove("flex");
          avatarModal.classList.add("hidden");
        }
      });
      closeBtn.addEventListener("click", () => {
        avatarModal.classList.remove("flex");
        avatarModal.classList.add("hidden");
      });
    });
    const userData = JSON.parse(getItem("user"));
    const { name, accessToken } = userData;
    const user = await getUser(name, accessToken);

    avatarElement.src =
      user.avatar === ""
        ? "../../../public/assets/profile-placeholder.jpg"
        : user.avatar;
    usernameElement.textContent = user.name;
    emailElement.textContent = user.email;
    creditsElement.textContent = `Credits: ${user.credits}`;
    //listingsDetails(user.listings);
  } catch (error) {
    console.log(error);
  }
}

main();

// function listingsDetails(listings) {
//   console.log(listings);
//   if (listings.length === 0) {
//     console.log("No Listings");
//   } else {
//     listings.forEach((listing) => {
//       const list = document.createElement("ul");
//       list.innerHTML = `
//         <li class="font-mono font-thin text-sm sm:text-sm">
//             ${formatDate(listing.created)}
//         </li>
//         <li class="font-mono font-thin text-sm sm:text-sm">
//             Ended
//         </li>
//         <li class="font-mono font-thin text-sm sm:text-sm">
//             ${listing[_count].bids}
//         </li>
//         <li class="font-mono font-thin text-sm sm:text-sm">
//             USD 130
//         </li>`;
//     });
//   }
// }

async function submitAvatar() {
  let avatarURL = document.getElementById("user-avatar").value;
  try {
    const user = JSON.parse(getItem("user"));

    await updateAvatar(user, { avatar: avatarURL });

    location.reload();
  } catch (error) {
    const errorMessage = document.getElementById("avatar-error");
    errorMessage.classList.add("block");
    errorMessage.classList.remove("hidden");
    avatarURL = "";
  }
}

//

const openCreateListingsModalButton = document.getElementById(
  "open-create-listings-modal",
);

openCreateListingsModalButton.addEventListener("click", () => {
  const createListingsModal = document.getElementById("create-listings-modal");
  const closeModalButton = document.getElementById("create-listings-close");
  createListingsModal.classList.add("flex");
  createListingsModal.classList.remove("hidden");
  createListingsModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      createListingsModal.classList.remove("flex");
      createListingsModal.classList.add("hidden");
    }
  });
  closeModalButton.addEventListener("click", () => {
    createListingsModal.classList.remove("flex");
    createListingsModal.classList.add("hidden");
  });
});

const addTagsButton = document.getElementById("add-tags-button");
addTagsButton.addEventListener("click", () => {
  const tagsContainer = document.getElementById("tags-container");
  const tag = document.createElement("input");

  tag.classList.add(
    "tag-input",
    "bg-white",
    "bg-opacity-20",
    "p-4",
    "ps-4",
    "text-sm",
    "text-white",
    "w-full",
    "rounded-xl",
    "mt-4",
  );
  tag.ariaLabel = "Item tag";
  tag.type = "text";
  tag.placeholder = "Item Tag";
  const tagsArray = document.querySelectorAll(".tag-input");
  if (tagsArray.length > 3) {
    tagsContainer.querySelector("p").classList.remove("hidden");
  } else {
    tagsContainer.append(tag);
  }
});

const addImageButton = document.getElementById("add-image-button");
addImageButton.addEventListener("click", () => {
  const imageContainer = document.getElementById("image-container");
  const image = document.createElement("input");
  image.classList.add(
    "image-input",
    "bg-white",
    "bg-opacity-20",
    "p-4",
    "ps-4",
    "text-sm",
    "text-white",
    "w-full",
    "rounded-xl",
    "mt-4",
  );
  image.ariaLabel = "Item image URL";
  image.type = "text";
  image.placeholder = "Item image URL";
  const imageArray = document.querySelectorAll(".image-input");
  if (imageArray.length > 4) {
    imageContainer.querySelector("p").classList.remove("hidden");
  } else {
    imageContainer.append(image);
  }
});

const submitListingButton = document.getElementById("submit-listing-button");
submitListingButton.addEventListener("click", async () => {
  const titleHTML = document.getElementById("title");
  const descriptionHTML = document.getElementById("description");
  const tagsHTML = document.querySelectorAll(".tag-input");
  const imagesHTML = document.querySelectorAll(".image-input");
  const endsAtHTML = document.getElementById("auction-deadline");
  const dateErrorMessage = document.getElementById("date-error");
  const titleErrorMessage = document.getElementById("title-error");
  const genericErrorMessage = document.getElementById("generic-error");
  try {
    dateErrorMessage.textContent = "";
    titleErrorMessage.textContent = "";
    genericErrorMessage.textContent = "";
    if (titleHTML.value === "") {
      titleErrorMessage.textContent =
        "Please provide a title for your listing.";
    }

    const checkedDate = checkEndsAtDate(endsAtHTML.value);

    const createdListing = {
      title: titleHTML.value,
      description: descriptionHTML.value,
      tags: getValues(tagsHTML),
      media: getValues(imagesHTML),
      endsAt: checkedDate,
    };
    const user = JSON.parse(getItem("user"));

    const response = await createListing(user, createdListing);
  } catch (error) {
    if (error.message === "Empty date string.") {
      dateErrorMessage.textContent = "Please set an end date for your auction.";
    }
    if (error.message === "Wrong date.") {
      dateErrorMessage.textContent = "End date can't be before current day.";
    }
    if (error.status === "Not Found") {
      genericErrorMessage.textContent =
        "Failed to submit listing. Please try again later.";
    }
  }
});

function getValues(htmlElements) {
  const array = [];
  htmlElements.forEach((element) => array.push(element.value));
  return array;
}

function checkEndsAtDate(endsAt) {
  if (endsAt === "") {
    throw { message: "Empty date string." };
  }
  const currentDate = new Date();
  const endsAtDate = new Date(endsAt);
  if (endsAtDate < currentDate) {
    throw { message: "Wrong date." };
  } else {
    return endsAt;
  }
}
