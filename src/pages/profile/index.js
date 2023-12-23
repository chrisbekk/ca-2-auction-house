import { getItem } from "../../js/storage/getItem.js";
import { getUser } from "../../js/api/getUser.js";
import { formatDate } from "../../js/utils/formatDate.js";
import { openModal } from "../../js/listeners/openModal.js";
import { closeModal } from "../../js/listeners/closeModal.js";
import { loginButton } from "../../js/components/navBar.js";
import { toggleNav } from "../../js/listeners/toggleNav.js";
import { updateAvatar } from "../../js/api/updateAvatar.js";
import { createListing } from "../../js/api/createListing.js";
import { getUserListings } from "../../js/api/getUserListings.js";
import { checkDeadlineStatus } from "../../js/utils/checkDeadlineStatus.js";
async function main() {
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const creditsElement = document.getElementById("credits");
  const avatarElement = document.getElementById("avatar");
  const navButton = document.getElementById("nav-button");

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
    const userListings = await getUserListings(name, accessToken);

    // Rendering listings details
    renderListingDetails(userListings);

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

function renderListingDetails(listingsArray) {
  console.log(listingsArray);
  const listingsContainer = document.getElementById("listings-container");
  if (listingsArray.length === 0) {
    const listMessage = document.createElement("p");
    listMessage.classList.add(
      "font-mono",
      "font-thin",
      "italic",
      "sm:text-center",
    );
    listMessage.textContent =
      "You have no listings. Create a New Listing and join the auction.";
    listingsContainer.append(listMessage);
  } else {
    // List Header

    const listHeader = document.createElement("ul");
    listHeader.classList.add(
      "grid",
      "grid-cols-3",
      "place-items-center",
      "border-b",
      "pb-2",
    );
    const categoryCount = 3;
    for (let i = 1; i <= categoryCount; i++) {
      const headerCategory = document.createElement("li");
      headerCategory.classList.add("font-mono", "sm:font-bold", "text-sm");
      if (i === 1) {
        headerCategory.textContent = "Created";
      }
      if (i === 2) {
        headerCategory.textContent = "Status";
      }
      if (i === 3) {
        headerCategory.textContent = "Bids";
      }
      listHeader.append(headerCategory);
    }
    listingsContainer.append(listHeader);
    // List Rows
    listingsArray.forEach((listing) => {
      const listingRow = document.createElement("ul");
      listingRow.classList.add(
        "grid",
        "grid-cols-3",
        "place-items-center",
        "border-b",
        "py-2",
        "hover:cursor-pointer",
        "hover:scale-[101%]",
        "hover:bg-white",
        "hover:bg-opacity-5",
        "transition",
      );
      listingRow.addEventListener("click", () => {
        document.location.href = `../listingsItem/listingsItem.html?id=${listing.id}`;
      });
      const listingDetailsCount = 3;
      for (let i = 1; i <= listingDetailsCount; i++) {
        const listingDetail = document.createElement("li");
        listingDetail.classList.add("font-mono", "font-thin", "text-sm");
        if (i === 1) {
          listingDetail.textContent = formatDate(listing.created);
        }
        if (i === 2) {
          listingDetail.textContent = checkDeadlineStatus(listing.endsAt);
        }
        if (i === 3) {
          listingDetail.textContent = listing._count.bids;
        }
        listingRow.append(listingDetail);
      }

      listingsContainer.append(listingRow);
    });
  }
}

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
