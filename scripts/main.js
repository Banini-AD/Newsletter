const form = document.querySelector("#newsletter-form");
const input = document.querySelector("#email");
const errorMessage = document.querySelector("#email-error");
const dismissButton = document.querySelector("#dismiss-button");

if (form) {
  form.addEventListener("submit", (e) => {
    handleSubmit(e);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  if (!input) {
    return;
  }

  const email = input.value.trim();
  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    input.classList.add("error");
    input.classList.remove("email-input");
    errorMessage.classList.add("visible");
    errorMessage.classList.remove("invisible");
    input.focus();
    return;
  }

  input.classList.remove("error");
  errorMessage.classList.remove("visible");
  input.classList.add("email-input");

  sessionStorage.setItem("subscriberEmail", email);
  window.location.href = "success.html";
}

if (input) {
  input.addEventListener("input", function () {
    this.classList.remove("error");
    this.classList.add("email-input");
    if (errorMessage) {
      errorMessage.classList.remove("visible");
      errorMessage.classList.add("invisible");
    }
  });
}

const successEmail = document.querySelector("#success-email");
if (successEmail) {
  const email = sessionStorage.getItem("subscriberEmail");

  if (email) {
    successEmail.textContent = email;
    sessionStorage.removeItem("subscriberEmail");
  } else {
    window.location.href = "index.html";
  }
}

if (dismissButton) {
  dismissButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
