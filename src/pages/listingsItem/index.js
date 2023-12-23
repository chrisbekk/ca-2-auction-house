import { getSingleListing } from "../../js/api/getSingleListing.js";
import { queryParam } from "../../js/utils/queryParam.js";
import { imageGallery } from "../../js/components/imageGallery.js";
import { loginButton } from "../../js/components/navBar.js";
import { getItem } from "../../js/storage/getItem.js";
import { postBid } from "../../js/api/postBid.js";
import { getUser } from "../../js/api/getUser.js";
import { setItem } from "../../js/storage/setItem.js";
import { toggleNav } from "../../js/listeners/toggleNav.js";

const navButton = document.getElementById("nav-button");
navButton.addEventListener("click", toggleNav);
async function main() {
  try {
    const listingsID = queryParam("id");
    const { accessToken, name } = JSON.parse(getItem("user"));
    const listing = await getSingleListing(listingsID);

    const { bids, description, endsAt, seller, tags, media, title } = listing;
    imageGallery(media, title);
    listingDetails(bids, description, endsAt, seller, tags, title);
    bidsDetailsList(bids);
    bidOnListing(name, bids, accessToken, listingsID);
  } catch (error) {
    console.log(error);
  }
}

main();

const showBidDetailsButton = document.getElementById("show-bid-details-button");
showBidDetailsButton.addEventListener("click", () => {
  const bidsDetailsContainer = document.getElementById("bid-details-modal");
  bidsDetailsContainer.classList.remove("hidden");
  bidsDetailsContainer.classList.add("flex");
  bidsDetailsContainer.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      bidsDetailsContainer.classList.add("hidden");
      bidsDetailsContainer.classList.remove("flex");
    }
  });
});

const closeBidDetailsButton = document.getElementById(
  "close-bid-details-modal",
);
closeBidDetailsButton.addEventListener("click", () => {
  const bidsDetailsContainer = document.getElementById("bid-details-modal");
  bidsDetailsContainer.classList.add("hidden");
  bidsDetailsContainer.classList.remove("flex");
});

function bidsDetailsList(bidsArray) {
  const bidsListContainer = document.getElementById("bids-list");
  if (bidsArray.length === 0) {
    const bidsListMessage = document.createElement("p");
    bidsListMessage.textContent =
      "Currently no bids on this item. Make an offer and be the first bidder!";
    bidsListContainer.append(bidsListMessage);
  } else {
    // Sort bidsArray from highest to lowest amount
    const sortedBids = [...bidsArray].sort((a, b) => b.amount - a.amount);
    console.log(sortedBids);
    sortedBids.forEach((bid, index) => {
      const bidList = document.createElement("ul");
      bidList.classList.add("grid", "grid-cols-3", "justify-items-center");
      const bidDetailsCount = 3;
      for (let i = 1; i <= bidDetailsCount; i++) {
        const bidDetail = document.createElement("li");
        bidDetail.classList.add("px-4", "my-2", "text-sm", "font-thin");
        if (index === 0) {
          bidDetail.classList.add("text-primary-400");
        }
        if (i === 1) {
          bidDetail.textContent = index + 1;
        }
        if (i === 2) {
          bidDetail.textContent = bid.bidderName;
        }
        if (i === 3) {
          bidDetail.textContent = bid.amount;
        }
        bidList.append(bidDetail);
      }
      bidsListContainer.append(bidList);
    });
  }
}

function listingDetails(bids, description, endsAt, seller, tags, title) {
  const listingTitle = document.getElementById("listing-title");
  const highestBid = document.getElementById("listing-highest-bid");
  //const numberOfBids = document.getElementById("bids-amount");
  const listingSeller = document.getElementById("listing-seller");
  const listingDescription = document.getElementById("listing-description");
  listingTitle.textContent = title;
  createTags(tags);
  highestBid.append(currentBid(bids));
  //numberOfBids.append(bidsCounter(bids));
  auctionDeadline(endsAt);

  listingSeller.textContent = seller.name;
  listingDescription.textContent = description;
}
function createTags(tags) {
  const tagsContainer = document.getElementById("listing-tags");
  if (tags.length != 0) {
    tags.forEach((element) => {
      if (element === "") {
        return;
      } else {
        const tag = document.createElement("li");
        tag.classList.add(
          "inline-block",
          "mr-2",
          "my-2",
          "rounded-xl",
          "bg-primary-400",
          "px-6",
          "py-2",
          "text-black",
          "text-sm",
          "tracking-wider",
          "w-fit",
        );
        tag.textContent = element;
        tagsContainer.append(tag);
      }
    });
  }
}

function currentBid(bids) {
  return bids.reduce((max, obj) => (obj.amount > max ? obj.amount : max), 0);
}

function bidsCounter(bids) {
  const string = bids.length <= 1 ? "bid" : "bids";
  return `${bids.length} ${string}`;
}

function auctionDeadline(endsAt) {
  const counter = document.getElementById("counter");
  const timeLeft = document.getElementById("listing-deadline");

  const deadline = new Date(endsAt);
  const currentTime = new Date();
  const delta = deadline - currentTime;

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Remove existing background color classes
  counter.classList.remove("bg-red-300", "bg-orange-300", "bg-green-300");

  if (delta <= 0) {
    // Auction ended
    counter.classList.add("bg-red-300", "bg-opacity-70");
    timeLeft.textContent = `Auction Ended`;
  } else if (days <= 3) {
    // Less than or equal to 3 days
    counter.classList.add("bg-red-300", "bg-opacity-70");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  } else if (days <= 7) {
    // Less than or equal to 7 days
    counter.classList.add("bg-orange-300", "bg-opacity-70");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  } else {
    // More than 7 days
    counter.classList.add("bg-green-300", "bg-opacity-70");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  }
}

function bidOnListing(name, bids, accessToken, listingsID) {
  console.log(bids);
  const bidOnListingButton = document.getElementById("bid-on-listing-button");
  bidOnListingButton.addEventListener("click", () => {
    const bidOnListingModal = document.getElementById("bid-on-listing-modal");
    bidOnListingModal.classList.add("flex");
    bidOnListingModal.classList.remove("hidden");
    submitBid(name, bids, accessToken, listingsID);
    bidOnListingModal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        const bidAmountHTML = document.getElementById("bid-amount");
        bidAmountHTML.value = null;
        const amountErrorMessage = document.getElementById("amount-error");
        amountErrorMessage.classList.add("hidden");
        bidOnListingModal.classList.remove("flex");
        bidOnListingModal.classList.add("hidden");
      }
    });
  });
}

const closeBidOnListingModal = document.getElementById(
  "close-bid-on-listing-modal",
);
closeBidOnListingModal.addEventListener("click", () => {
  const bidOnListingModal = document.getElementById("bid-on-listing-modal");
  const bidAmountHTML = document.getElementById("bid-amount");
  bidAmountHTML.value = null;
  const amountErrorMessage = document.getElementById("amount-error");
  amountErrorMessage.classList.add("hidden");
  bidOnListingModal.classList.remove("flex");
  bidOnListingModal.classList.add("hidden");
});

async function submitBid(name, bids, accessToken, listingsID) {
  console.log(bids);
  const currentHighestBid = currentBid(bids);
  const submitBidButton = document.getElementById("submit-bid");
  submitBidButton.disabled = true;
  const errorMessage = document.getElementById("generic-error");
  errorMessage.classList.add("hidden");
  const bidAmountHTML = document.getElementById("bid-amount");
  const user = await getUser(name, accessToken);
  console.log(user);
  const { credits } = user;
  const userCreditHTML = document.getElementById("user-credit");
  userCreditHTML.textContent = credits;
  const highestBidHTML = document.getElementById("bid-to-beat");
  highestBidHTML.textContent = currentHighestBid;
  const amountErrorMessage = document.getElementById("amount-error");
  // Event Listener for Amount input
  bidAmountHTML.addEventListener("input", (e) => {
    submitBidButton.disabled = true;
    const amount = parseInt(e.target.value);
    userCreditHTML.textContent = credits - amount;
    if (e.target.value === "") {
      userCreditHTML.textContent = credits;
    }
    if (credits - amount < 0) {
      amountErrorMessage.classList.add("block");
      amountErrorMessage.classList.remove("hidden");
      userCreditHTML.textContent = 0;
    } else {
      amountErrorMessage.classList.remove("block");
      amountErrorMessage.classList.add("hidden");
      if (amount > currentHighestBid) {
        submitBidButton.disabled = false;
        submitBidButton.addEventListener("click", async (e) => {
          try {
            e.preventDefault();
            await postBid(accessToken, amount, listingsID);
            window.location.reload();
          } catch (error) {
            const errorMessage = document.getElementById("generic-error");
            errorMessage.classList.remove("hidden");
          }
        });
      }
    }
  });
  console.log(credits);
}
const listingsID = queryParam("id");
console.log(listingsID);
