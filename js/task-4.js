// Uppercase

const form = document.querySelector(".uppercase-form");
const radioButtons = document.querySelectorAll('input[name="register"]');
const paragraph = document.getElementById("hero-paragraph");

const originalText = paragraph ? paragraph.textContent : "";

function setFirstLetterUppercase() {
  if (paragraph) {
    paragraph.innerText = paragraph.textContent
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

function setNormalCase() {
  if (paragraph) {
    paragraph.innerText = originalText;
  }
}

function saveToLocalStorage(value) {
  localStorage.setItem("textCase", value);
}

function getFromLocalStorage() {
  return localStorage.getItem("textCase");
}

form.addEventListener("change", (event) => {
  if (event.target.name === "register") {
    const selectedValue = event.target.value;

    if (selectedValue === "uppercase") {
      setFirstLetterUppercase();
    } else if (selectedValue === "normal") {
      setNormalCase();
    }

    saveToLocalStorage(selectedValue);
  }
});

const savedValue = getFromLocalStorage();

if (savedValue) {
  radioButtons.forEach((radio) => {
    if (radio.value === savedValue) {
      radio.checked = true;
    }
  });

  if (savedValue === "uppercase") {
    setFirstLetterUppercase();
  } else if (savedValue === "normal") {
    setNormalCase();
  }
}
