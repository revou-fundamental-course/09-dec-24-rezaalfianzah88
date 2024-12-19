// Function to set the document title based on the clicked element
function setTitle(element) {
  const text = element.innerText; // Get the text of the clicked element
  document.title = `${text} | Mini Project-Travel Agent`; // Set the document title
}

// Function to toggle the visibility of the navigation menu
function toggleMenuButton() {
  document.getElementById("menu-list").classList.toggle("show"); // Toggle the 'show' class on the menu list
}

// Function to scroll to the start button
function getStartButton() {
  const bannerHeight = document.getElementById("home").clientHeight; // Get the height of the home section
  const headerHeight = document.querySelector(".header").clientHeight; // Get the height of the header
  window.scrollBy(0, bannerHeight - headerHeight); // Scroll the window by the difference in height
}

// Validation function for the contact form
function validateForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const form = document.forms["contact-form"];
  const name = form["name"].value;
  const email = form["email"].value;
  const interest = form["interest"].value;

  const isEmailValid = /^[\w.-]+@\w+\.\w{2,3}(\.\w{2,})?$/.test(email); // Improved regex for email validation

  // Reset error messages
  resetErrorMessages();

  let isValid = true;

  if (!name) {
      showError("name-error");
      isValid = false;
  }

  if (!isEmailValid) {
      showError("email-error");
      isValid = false;
  }

  // Check if interest is not selected
  if (interest === "" || interest === "none") {
      showError("interest-error");
      isValid = false;
  }

  if (isValid) {
      alert(`Data anda telah sukses terkirim, ${name}`);
      form.reset(); // Reset the form after successful validation
  }
}

// Function to reset error messages
function resetErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach(err => {
    err.style.display = "none";
    err.style.visibility = "hidden";
  });
}

// Function to show error messages
function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block";
  errorElement.style.visibility = "visible";
}

// Function to fill input and hide error messages
function fillInput(fieldName) {
  const inputValue = document.getElementById(fieldName).value;
  const errorText = document.getElementById(`${fieldName}-error`);

  if (inputValue && errorText.style.visibility === "visible") {
    errorText.style.display = "none";
    errorText.style.visibility = "hidden";
  }
}

// Function to select interest and hide error messages
function selectInterest() {
  const interestValue = document.getElementById("interest").value;
  const errorText = document.getElementById("interest-error");

  if (interestValue !== "none" && errorText.style.visibility === "visible") {
    errorText.style.display = "none";
    errorText.style.visibility = "hidden";
  }
}

// Auto-sliding banner functionality
const homeSlider = document.getElementById("home-slider"); // Get the home slider element
const windowWidth = homeSlider.clientWidth; // Get the width of the home slider

let index = 1; // Initialize the index for the current slide

// Set the initial position of the slider
homeSlider.style.transform = `translateX(${-windowWidth * index}px)`;

// Set an interval to automatically slide the banner
setInterval(() => {
  if (index >= 6) return; // Stop if the last slide is reached

  index++; // Move to the next slide
  homeSlider.style.transition = "all 2s ease-in-out"; // Apply transition effect
  homeSlider.style.transform = `translateX(${-windowWidth * index}px)`; // Update the slider position
}, 6000); // Set the interval for sliding

// Event listener for when the transition ends
homeSlider.addEventListener("transitionend", () => {
  if (document.getElementById(`slide${index}`)?.id === "slide6") { // Check if the last slide is reached
    homeSlider.style.transition = "none"; // Remove transition for reset
    index = 0; // Reset index to the first slide
    homeSlider.style.transform = `translateX(${-windowWidth * index}px)`; // Reset slider position
  }
});

// Attach the validateForm function to the form submission event
document.forms["contact-form"].addEventListener("submit", validateForm);
