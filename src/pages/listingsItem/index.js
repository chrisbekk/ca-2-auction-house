import { getSingleListing } from "../../js/api/getSingleListing.js";
import { queryParam } from "../../js/utils/queryParam.js";
import { imageGallery } from "../../js/components/imageGallery.js";
import { loginButton } from "../../js/components/navBar.js";
const gallery = [
  "https://st3.depositphotos.com/1064024/14272/i/450/depositphotos_142722813-stock-photo-heart-love-tree.jpg",
  "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
  "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
  "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
  "https://theimageconference.org/wp-content/uploads/2019/11/vancouver_image_conference_2.jpg",
];

async function main() {
  try {
    const listingsID = queryParam("id");
    console.log(listingsID);
    const listing = await getSingleListing(listingsID);
    const { bids, description, endsAt, seller, tags, media, title } = listing;
    imageGallery(media, title);
    listingDetails(bids, description, endsAt, seller, tags, title);
  } catch (error) {
    console.log;
  }
}

main();

function listingDetails(bids, description, endsAt, seller, tags, title) {
  const listingTitle = document.getElementById("listing-title");
  const highestBid = document.getElementById("listing-highest-bid");
  const numberOfBids = document.getElementById("bids-amount");
  const listingSeller = document.getElementById("listing-seller");
  const listingDescription = document.getElementById("listing-description");
  listingTitle.textContent = title;
  createTags(tags);
  highestBid.append(currentBid(bids));
  numberOfBids.append(bidsCounter(bids));
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
    counter.classList.add("bg-red-300");
    timeLeft.textContent = `Auction Ended`;
  } else if (days <= 3) {
    // Less than or equal to 3 days
    counter.classList.add("bg-red-300");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  } else if (days <= 7) {
    // Less than or equal to 7 days
    counter.classList.add("bg-orange-300");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  } else {
    // More than 7 days
    counter.classList.add("bg-green-300");
    timeLeft.textContent = `${days} days, ${hours} hours`;
  }
}
