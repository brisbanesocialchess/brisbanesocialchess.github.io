// Elements
const elmYear = document.getElementById("year");
const elmFormRegister = document.querySelector(".form-registration");
const elmFormContact = document.querySelector(".form-contact");

// Utilities
function getCurrentYear() {
  return new Date().getFullYear();
}

function showAlert(errors) {
  alert("Please fix the following:\n- " + errors.join("\n- "));
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validateRegisterForm(data) {
  const errors = [];

  const currentYear = getCurrentYear();
  const minAge = 5;
  const maxAge = 120;

  if (!data.firstName?.trim()) errors.push("First name is required.");
  if (!data.lastName?.trim()) errors.push("Last name is required.");

  const year = parseInt(data.birthYear, 10);
  const age = currentYear - year;

  if (!year || isNaN(year)) {
    errors.push("Birth year is required.");
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

    const result = await response.json();

    if (response.ok) {
      alert("✅ Submission successful!");
      form.reset();
    } else {
      alert("❌ Error: " + (result.message || "Something went wrong."));
    }
  } catch (err) {
    alert("❌ Network error. Please try again.");
    console.error(err);
  }
}

// Event Bindings
if (elmFormRegister) {
  elmFormRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(elmFormRegister, "/api/register", validateRegisterForm);
  });
}

if (elmFormContact) {
  elmFormContact.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(elmFormContact, "/api/contact", validateContactForm);
  });
}

// Init
if (elmYear) elmYear.textContent = getCurrentYear();
