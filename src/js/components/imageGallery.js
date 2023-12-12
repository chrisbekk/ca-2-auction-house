export function imageGallery(media, title) {
  const gallery = [
    "https://st3.depositphotos.com/1064024/14272/i/450/depositphotos_142722813-stock-photo-heart-love-tree.jpg",
    "https://buffer.com/library/content/images/2023/09/instagram-image-size.jpg",
    "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
    "https://theimageconference.org/wp-content/uploads/2019/11/vancouver_image_conference_2.jpg",
  ];

  const image = document.getElementById("primary-image");
  const mediaGrid = document.getElementById("media-grid");
  image.src = media;
  image.alt = title;
  if (media.length <= 2) {
    mediaGrid.classList.add("hidden");
  } else {
    thumbnailGrid(media, title);
  }
}

function thumbnailGrid(media, title) {
  const mediaGrid = document.getElementById("media-grid");
  media.forEach((image) => {
    const thumbnail = document.createElement("img");
    thumbnail.classList.add(
      "rounded-md",
      "shadow-sm",
      "shadow-black",
      "w-[75px]",
      "h-[60px]",
      "object-fill",
      "transition",
      "hover:scale-105",
      "hover:cursor-pointer",
      "sm:w-[100px]",
      "sm:h-[100px]",
    );
    thumbnail.alt = title;
    thumbnail.src = image;
    thumbnail.addEventListener("click", () => {
      const test = document.getElementById("primary-image");
      test.src = image;
      test.alt = title;
    });
    mediaGrid.append(thumbnail);
  });
}
