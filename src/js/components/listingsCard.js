import { getDaysLeft } from "../utils/getDaysLeft.js";

export function listingsCard(listing) {
  console.log("listings function...");
  const { title, id, endsAt, tags, media, bids } = listing;
  const listingsImage =
    media.length !== 0
      ? media[0]
      : "../../../public/assets/jk-placeholder-image.jpg";
  const latestPrice = sortBids(bids);
  const daysLeft = getDaysLeft(endsAt);
  let bgColorDays = "";
  if (daysLeft < 3) {
    bgColorDays = "bg-red-400";
  } else if (daysLeft < 7) {
    bgColorDays = "bg-orange-400";
  } else {
    bgColorDays = "bg-green-400";
  }

  const tagsHTML = tags
    .map(
      (tag) =>
        `<p class="text-black font-thin text-xs bg-primary-400 p-1 rounded-lg max-w-[100px] truncate>${tag}</p>`,
    )
    .join("");

  const card = `
      <div id=${id} class="listings-item w-full h-[140px] sm:h-[160px] max-w-[400px] mx-auto flex rounded-md shadow-md hover:cursor-pointer sm:hover:scale-[1.02] transition">
        <div class="h-full w-[115px] sm:w-[150px] aspect-square">
          <img src=${listingsImage} alt=${title}
            class="w-full h-full rounded-l-md"
          />
        </div>
        <div class="p-2 sm:pl-4 ml-1 w-full flex flex-col justify-evenly bg-white bg-opacity-20 rounded-r-md">
          <div class="flex justify-end">
            <p class="text-[10px] sm:text-[12px] font-thin">
              Ends in: <span class="font-normal">${daysLeft} ${
                daysLeft === 1 ? "day" : "days"
              }</span>
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-xs sm:text-base tracking-wider sm:w-[200px] text-wrap truncate">
              ${title}
            </p>
            <p class="font-thin text-[10px] sm:text-xs sm:mt-1">
              USD <span class="font-normal">${latestPrice}</span>
            </p>
            <div class="flex gap-1 mt-4 items-center">
                ${tagsHTML}
            </div>
          </div>
        </div>
      </div>
`;

  return card;
}

function sortBids(bids) {
  if (bids.length === 0) {
    return 0;
  }
  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);
  return sortedBids[0].amount;
}
