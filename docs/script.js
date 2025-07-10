// Variables
const API_BASE = 'https://cfsite.brisbanesocialchess.workers.dev/';

// Elements
const elmYear = document.getElementById("year");
const elmFormRegister = document.querySelector(".form-registration");
const elmFormContact = document.querySelector(".form-contact");
const elmEmailElements = document.querySelectorAll(".email-obfuscated");

// Utilities
function getCurrentYear() {
  return new Date().getFullYear();
}

function showAlert(errors) {
  alert("Please fix the following:\n- " + errors.join("\n- "));
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateRegisterForm(data) {
  const errors = [];

  const currentYear = getCurrentYear();
  const minAge = 5;
  const maxAge = 120;

  if (!data.firstName?.trim()) errors.push("First name is required.");
  if (!data.lastName?.trim()) errors.push("Last name is required.");

  const year = data.birthYear ? parseInt(data.birthYear, 10) : NaN;
  const age = currentYear - year;

  if (!data.birthYear?.trim()) {
    errors.push("Birth year is required.");
  } else if (isNaN(year)) {
    errors.push("Birth year must be a valid number.");
  } else if (age < minAge || age > maxAge) {
    errors.push(`Age must be between ${minAge} and ${maxAge} years old.`);
  }

  if (!data.gender) errors.push("Gender is required.");
  if (!data.email?.trim() || !isValidEmail(data.email)) {
    errors.push("Valid email is required.");
  }

  return errors;
}

function validateContactForm(data) {
  const errors = [];

  if (!data.name?.trim()) errors.push("Name is required.");
  if (!data.email?.trim() || !isValidEmail(data.email)) {
    errors.push("Valid email is required.");
  }
  if (!data.message?.trim()) errors.push("Message is required.");

  return errors;
}

async function handleFormSubmit(form, endpoint, validateFn) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const errors = validateFn(data);
  if (errors.length > 0) {
    showAlert(errors);
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("✅ Submission successful!");
      form.reset();
    } else {
      const defaultErrorMessage = "Something went wrong.";
      try {
        const result = await response.json();
        const errorMessage = result.message || defaultErrorMessage;
        alert("❌ Error: " + errorMessage);
      } catch (e) {
        console.error("Error parsing JSON response:", e);
        alert("❌ Error: " + defaultErrorMessage);
      }
    }
  } catch (err) {
    alert("❌ Network error. Please try again.");
    console.error(err);
  }
}

// Event Bindings
elmFormRegister?.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleFormSubmit(elmFormRegister, API_BASE + "/api/register", validateRegisterForm);
});

elmFormContact?.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleFormSubmit(elmFormContact, API_BASE + "/api/contact", validateContactForm);
});

// Init
elmYear?.textContent = getCurrentYear();

const email = String.fromCharCode(106,111,104,110,46,116,101,115,116,64,103,109,97,105,108,46,99,111,109);
elmEmailElements?.forEach((el) => {
  if (el.getAttribute("data-email-href") !== null) {
    el.href = `mailto:${email}`;
  }
  if (el.getAttribute("data-email-content") !== null) {
    el.textContent = email;
  }
});
