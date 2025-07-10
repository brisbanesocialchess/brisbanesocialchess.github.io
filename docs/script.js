// Elements
const elm_year = document.getElementById("year");
const elm_form_contact = document.querySelector(".form-contact");
const elm_form_register = document.querySelector(".form-registration");

// Events
if (elm_form_register) elm_form_register.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(elm_form_register);
    const data = Object.fromEntries(formData.entries());

    const errors = [];

    if (!data.firstName.trim()) errors.push("First name is required.");
    if (!data.lastName.trim()) errors.push("Last name is required.");
    if (!data.birthYear || data.birthYear < 1900 || data.birthYear > 2025) {
        errors.push("Birth year must be between 1900 and 2025.");
    }
    if (!data.gender) errors.push("Gender is required.");
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push("Valid email is required.");
    }

    if (errors.length > 0) {
        alert("Please fix the following:\n- " + errors.join("\n- "));
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Registration successful!");
            form.reset(); // Clear form
        } else {
            alert("❌ Error: " + (result.message || "Something went wrong."));
        }
    } catch (err) {
        alert("❌ Network error. Please try again.");
        console.error(err);
    }
});

// Init
if (elm_year) elm_year.textContent = new Date().getFullYear();
