// Adding an image

const logoContainer = document.querySelector(".logo-container");
const popularContainer = document.querySelector(".popular-container");
const sidebarContainer = document.querySelector(".arrow-container");

let formAdded = false;

logoContainer.addEventListener("click", (event) => {
  event.preventDefault;

  if (!formAdded) {
    imageForm();
    formAdded = true;
  }
});

// Load saved images on startup
loadSaveImage();

function imageForm() {
  const formHTML = `
     <div class="image-form-container" style="text-align: start; font-size: 20px; margin-top: 20px; padding: 15px; border: 1px solid #727272; border-radius: 8px;">
                <b><p style="margin-bottom: 10px">Add new image</p></b>
                <div style="margin-bottom: 10px;">
                    <label for="image-url">URL image link:</label>
                    <input type="url" id="image-url" placeholder="https://example.com/image.jpg" 
                           style="width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                <button id="add-image-btn" style="padding: 10px 20px; background: linear-gradient(to right, #cc99ff 0%, #ff66cc 100%); color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600;">
                    Add image
                </button>
            </div>
    `;

  popularContainer.insertAdjacentHTML("beforeend", formHTML);

  document
    .getElementById("add-image-btn")
    .addEventListener("click", addImageToStorage);
}

function addImageToStorage() {
  const urlInput = document.getElementById("image-url");

  const imageUrl = urlInput.value.trim();

  if (!imageUrl) {
    alert("Please enter the image URL.");
    return;
  } else if (!isValidUrl(imageUrl)) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }

  const imageId = "img_" + Date.now();

  const imageData = {
    id: imageId,
    url: imageUrl,
    date: Date.now(),
  };

  // Get the current list of images from localStorage
  const savedImagesInStorage = JSON.parse(localStorage.getItem("image")) || [];

  // Add new image
  savedImagesInStorage.push(imageData);

  // Save the updated list
  localStorage.setItem("image", JSON.stringify(savedImagesInStorage));

  addImageToPage(imageData);

  // Clear the form
  urlInput.value = "";

  alert("Image added to sidebar!");
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function addImageToPage(imageData) {
  const imageHTML = `
     <div class="added-image" data-image-id="${imageData.id}" style="margin: 20px auto; text-align: center;">
                <img src="${imageData.url}" alt="Beautiful image" 
                     style="max-width: 300px; height: auto; border-radius: 8px; border: 2px solid #eee;">
                <div style="margin-top: 10px;">
                    <button onclick="removeImage('${imageData.id}')" 
                            style="padding: 5px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Delete
                    </button>
                </div>
            </div>
    `;

  sidebarContainer.insertAdjacentHTML("beforeend", imageHTML);
}

//Function to load saved images at startup
function loadSaveImage() {
  const savedImagesInStorage = JSON.parse(localStorage.getItem("image")) || [];

  savedImagesInStorage.forEach((imageData) => {
    addImageToPage(imageData);
  });
}

// Function to delete the image
window.removeImage = function (imageId) {
  const imageElement = document.querySelector(`[data-image-id="${imageId}"]`);
  if (imageElement) {
    imageElement.remove();
  }

  const savedImagesInStorage = JSON.parse(localStorage.getItem("image")) || [];
  const updatedImages = savedImagesInStorage.filter(
    (img) => img.id !== imageId
  );
  localStorage.setItem("image", JSON.stringify(updatedImages));

  alert("Image deleted!");
};
