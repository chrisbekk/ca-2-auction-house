import { getDaysLeft } from "../utils/getDaysLeft.js";

export function listingsCard(listing) {
  console.log("listings function...");
  const { title, id, endsAt, tags, media, bids } = listing;
  const listingsImage =
    media.length !== 0
      ? media[0]
      : "../../../public/assets/jk-placeholder-image.jpg";
  const latestPrice = bids.length !== 0 ? bids[bids.length - 1].amount : 0;
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
        `<span class="rounded-md bg-teal-500 text-[12px] py-1 px-2 mr-1 max-w-[100px] truncate">${tag}</span>`,
    )
    .join("");

  const card = `
    <div class="listings-item relative group rounded-lg h-[350px] sm:h-[300px] md:h-[350px] w-full max-w-md mx-auto shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]" id=${id}>
        <img src=${listingsImage} alt=${title} class="transition opacity-80 group-hover:opacity-100 w-full h-full object-cover rounded-lg">
        <div class="absolute rounded-br-lg rounded-bl-lg bottom-0 bg-black bg-opacity-50 w-full h-[40%] p-3 text-black shadow-[0px_-10px_7px_1px_#00000024]">
            <div class="flex mb-4 tags-container">
                ${tagsHTML}
            </div>
            <p class="text-lg font-medium bg-white bg-opacity-80 backdrop-blur-lg rounded-md py-1 pl-2 pr-10 shadow-[1px_-1px_2px_0px_#2d3748] w-48 truncate">${title}</p>
            <p class="text-md font-bold w-fit px-3 py-1 bg-green-500 absolute bottom-5 right-[-7px] shadow-[1px_-1px_2px_0px_#2d3748] rounded-l-md rounded-r-lg"><span class="font-thin">USD </span>${latestPrice}</p>
            <p class="absolute w-fit px-3 pl-1 pr-2 ${bgColorDays} text-sm font-normal mt-4"><span class="text-xs font-thin">Ends in: </span>${daysLeft} ${
              daysLeft === 1 ? "day" : "days"
            }</p>
        </div>
    </div>`;

  return card;
}
