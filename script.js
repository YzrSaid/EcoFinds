let currentIndex = 0;
const images = [
  "images/sofa.jpg",
  "images/sofa_2.jpg",
  "images/boss.jpg",
  "images/sofa_2.jpg",
  "images/sample1.jpg",
  "images/sample2.png",
  "images/sample3.jpg",
  "images/sample4.jpg",
  "images/sample5.jpg",
];

function changeImage(imageSrc) {
  const imageElement = document.getElementById("displayed-image");
  if (imageElement) {
    imageElement.src = imageSrc;
  } else {
    console.error("Image element with ID 'displayed-image' not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".accordion-icon-down");

      if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close the accordion
        icon.src = "images/accordion-icon-down.png"; // Change to down arrow image
      } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Open the accordion
        icon.src = "images/accordion-icon-up.png"; // Change to up arrow image
      }
    });
  });

  // --- Phone Number Validation ---
  const phoneInput = document.getElementById("phone-input");
  if (phoneInput) {
    phoneInput.addEventListener("keypress", function (event) {
      const char = String.fromCharCode(event.which);
      if (!/^[0-9]*$/.test(char)) {
        event.preventDefault();
        return;
      }

      const phoneNumberWithoutCountryCode = phoneInput.value.slice(0);
      if (phoneNumberWithoutCountryCode.length === 0 && char === "0") {
        event.preventDefault();
      }
    });

    phoneInput.addEventListener("input", function () {
      const phoneNumberWithoutCountryCode = phoneInput.value.slice(3);
      if (phoneNumberWithoutCountryCode.length > 10) {
        phoneInput.value = "+63" + phoneNumberWithoutCountryCode.slice(0, 10);
      }
    });
  }

  // --- Login Button ---
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      console.log("Username:", username, "Password:", password);

      if (username === "" || password === "") {
        alert("Please fill out both fields");
      } else {
        document.querySelector(".login-container-inner").submit();
      }
    });
  }

  // --- Upload Images for NGO ---
  const uploadButton = document.getElementById("upload-btn");
  if (uploadButton) {
    uploadButton.addEventListener("click", function () {
      document.getElementById("ngo-file-input").click();
    });
  }

  const fileInput = document.getElementById("ngo-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const files = this.files;
      let fileNames = "";

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          fileNames += files[i].name + "<br>";
        }
      } else {
        fileNames = "No files chosen";
      }

      document.getElementById("file-name-box").innerHTML = fileNames;
    });
  }

  document.querySelectorAll("select").forEach(function (select) {
    select.addEventListener("change", function () {
      if (select.value !== "") {
        select.classList.add("bold-option");
      }
    });
  });

  //this is for predefined images in user-item-edit.html
  // Predefined images array (update these paths to your actual images)
//   const predefinedImages = [
//     "images/sofa.jpg",
//     "images/sofa_2.jpg",
//     "images/boss.jpg",
//   ];

//   // Function to display an image with a remove button
//   function displayImage(src) {
//     const imageContainerEdit = document.getElementById("image-container-edit");
//     const imageItemEdit = document.createElement("div");
//     imageItemEdit.classList.add("image-item");

//     const imgEdit = document.createElement("img");
//     imgEdit.src = src;

//     const removeBtnEdit = document.createElement("button");
//     removeBtnEdit.innerText = "X";
//     removeBtnEdit.classList.add("remove-btn");
//     removeBtnEdit.onclick = function () {
//       imageContainerEdit.removeChild(imageItem);
//     };

//     imageItemEdit.appendChild(img);
//     imageItemEdit.appendChild(removeBtn);
//     imageContainerEdit.appendChild(imageItem);
//   }

//   // Load predefined images on page load
//   predefinedImages.forEach(displayImage);
  
// --- Upload Images for posting an item ---
const postImageInput = document.getElementById("file-input");
if (postImageInput) {
  postImageInput.addEventListener("change", function (event) {
    event.preventDefault();

    const files = event.target.files;
    const imageContainer = document.getElementById("image-container");

    // Process selected files
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageItem = document.createElement("div");
        imageItem.classList.add("image-item");

        const img = document.createElement("img");
        img.src = e.target.result;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = function () {
          imageContainer.removeChild(imageItem);
        };

        imageItem.appendChild(img);
        imageItem.appendChild(removeBtn);
        imageContainer.appendChild(imageItem); // Add new image to the container
      };
      reader.readAsDataURL(file);
    });

    // Manually reset the file input by removing and re-adding it to the DOM
    const clone = postImageInput.cloneNode(true);
    postImageInput.parentNode.replaceChild(clone, postImageInput);

    // Reattach the event listener to the new file input
    clone.addEventListener("change", arguments.callee);
  });
}

  // --- Like Icon Toggle ---
  const likeIcon = document.getElementById("like-icon");
  const likeFilledSrc = "images/like-filled-icon.png";
  const likeUnfilledSrc = "images/like-unfill-icon.png";

  if (likeIcon) {
    likeIcon.addEventListener("click", function () {
      if (likeIcon.src.endsWith("like-unfill-icon.png")) {
        likeIcon.src = likeFilledSrc;
      } else {
        likeIcon.src = likeUnfilledSrc;
      }
    });
  }

  // --- Image Gallery ---
  function initializeThumbnails() {
    const thumbnailElements = document.querySelectorAll(".thumbnail");
    thumbnailElements.forEach((thumbnail, index) => {
      if (index < images.length) {
        thumbnail.src = images[index];
        thumbnail.addEventListener("click", function () {
          currentIndex = index;
          changeImage(images[currentIndex]);
        });
      }
    });
  }

  function updateDisplayedImage() {
    changeImage(images[currentIndex]);
  }

  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateDisplayedImage();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % images.length;
      updateDisplayedImage();
    });
  }

  initializeThumbnails();
  changeImage(images[currentIndex]);
});


// Function to toggle the dropdown menu for specific ID
function toggleDropdown(id) {
    // Close all other dropdowns first
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].id !== id) {
        dropdowns[i].classList.remove("show");
      }
    }
  
    // Toggle the selected dropdown
    const dropdownMenu = document.getElementById(id);
    dropdownMenu.classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    // Check if the click was outside the dropdown or not
    if (
      !event.target.closest(".dropdown-toggle") &&
      !event.target.closest(".dropdown-content")
    ) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("show");
      }
    }
  };


// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const body = document.body;

    // Toggle classes
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("active");

    // Prevent scrolling on the page when sidebar is open
    if (sidebar.classList.contains("open")) {
        body.classList.add("no-scroll");
    } else {
        body.classList.remove("no-scroll");
    }

    // Close sidebar when clicking outside
    sidebarOverlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("active");
        body.classList.remove("no-scroll");
    });
}




