// Const variables
const API_BASE = 'https://cfsite.brisbanesocialchess.workers.dev';
const MIN_AGE = 5;
const MAX_AGE = 120;

// Elements
const elmToggleBtn = document.getElementById('menu-toggle');
const elmMenu = document.getElementById('menu');
const elmYear = document.getElementById('year');
const elmFormRegister = document.querySelector('.form-registration');
const elmFormContact = document.querySelector('.form-contact');
const elmEmailElements = document.querySelectorAll('.email-obfuscated');

// Utilities
/**
 * Returns the current year as a number.
 * @returns {number} The current year (e.g., 2025).
 */
function getCurrentYear() {
	return new Date().getFullYear();
}



/**
 * Displays a styled alert card with a custom message in the top-right corner of the page.
 *
 * If the required CSS styles are not already present in the document, they will be created and added.
 * The alert includes a close button that removes the alert card with a fade-out effect.
 *
 * @param {string} message - The message to be displayed inside the alert card.
 * @param {string} color - The color of the side bar, takes hex
 *
 * @example
 * Alert("Something went wrong!", "red");
 */
const Alert = (message = "alert message not found", color = "red") => {
    if (!document.getElementById('alert-card-style')) {
        const style = document.createElement('style');
        style.id = 'alert-card-style';
        style.innerHTML = `
.alert-card {
position: fixed;
top: 20px;
right: 20px;
background-color: white;
color: black;
padding: 16px 24px;
border-left: 5px solid ${color};
border-radius: 6px;
box-shadow: 0 2px 8px rgba(0,0,0,0.15);
font-family: Arial, sans-serif;
z-index: 1000;
min-width: 250px;
transition: opacity 0.3s ease;
}

.alert-card button {
background: none;
border: none;
color: black;
font-size: 18px;
font-weight: bold;
float: right;
cursor: pointer;
}

.alert-card.fade-out {
opacity: 0;
pointer-events: none;
}
`;
        document.head.appendChild(style);
    }

    const card = document.createElement('div');
    card.className = 'alert-card';
    card.innerHTML = ` <button>&times;</button> ${message} `;

    // Close button functionality
    card.querySelector('button').onclick = () => {
        card.classList.add('fade-out');
        setTimeout(() => card.remove(), 300);
    };

    document.body.appendChild(card);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (card.parentElement) {
            card.classList.add('fade-out');
            setTimeout(() => card.remove(), 300);
        }
    }, 5000);
};

/**
 * Displays an alert message with a list of validation errors.
 * @param {string[]} errors - The list of error messages.
 */
function showAlert(errors) {
	if (errors.length === 1) Alert(`Please fix the error: ${errors.join(' ')}`,"red");
	else Alert(`Please fix the following:\n- ${errors.join('\n- ')}`,"red");
}

/**
 * Validates whether the given email string is in a correct format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidEmail(email) {
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
	return regex.test(email);
}

/**
 * Validates the registration form data.
 * @param {Object} data - The registration form values.
 * @param {string} data.firstName - User's first name.
 * @param {string} data.lastName - User's last name.
 * @param {string} data.birthYear - Birth year as a string.
 * @param {string} data.gender - Gender selection.
 * @param {string} data.email - User's email address.
 * @returns {string[]} List of error messages.
 */
function validateRegisterForm(data) {
	const errors = [];

	const currentYear = getCurrentYear();

	if (!data.fname?.trim()) errors.push('First name is required.');
	if (!data.lname?.trim()) errors.push('Last name is required.');

	const year = data.birthyear ? parseInt(data.birthyear, 10) : NaN;
	const age = currentYear - year;

	if (!data.birthyear?.trim()) errors.push('Birth year is required.');
	else if (isNaN(year)) errors.push('Birth year must be a valid number.');
	else if (age < MIN_AGE || age > MAX_AGE) errors.push(`Age must be between ${MIN_AGE} and ${MAX_AGE} years old.`);

	if (!data.gender) errors.push('Gender is required.');
	if (!data.email?.trim() || !isValidEmail(data.email)) errors.push('Valid email is required.');

	return errors;
}

/**
 * Validates the contact form data.
 * @param {Object} data - The contact form values.
 * @param {string} data.name - Name of the sender.
 * @param {string} data.email - Email of the sender.
 * @param {string} data.subject - Subject of the message.
 * @param {string} data.message - The message text.
 * @returns {string[]} List of error messages.
 */
function validateContactForm(data) {
	const errors = [];

	if (!data.name?.trim()) errors.push('Name is required.');
	if (!data.email?.trim() || !isValidEmail(data.email)) errors.push('Valid email is required.');
	if (!data.subject?.trim()) errors.push('Subject is required.');
	if (!data.message?.trim()) errors.push('Message is required.');

	return errors;
}

/**
 * Handles form submission by validating and sending data to the server.
 * @param {HTMLFormElement} form - The form element to handle.
 * @param {string} endpoint - The API endpoint URL.
 * @param {(data: Object) => string[]} validateFn - The validation function.
 */
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
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		if (response?.ok && response?.status === 200) {
			Alert('✅ Submission successful!', "lightseagreen");
			form.reset();
		} else {
			const defaultErrorMessage = 'Something went wrong.';
			try {
				const result = await response.json();
				const errorMessage = result.message || defaultErrorMessage;
				Alert(`❌ Error: ${errorMessage}`, "red");
			} catch (e) {
				console.error('Error parsing JSON response:', e);
				Alert(`❌ Error: ${defaultErrorMessage}`, "red");
			}
		}
	} catch (err) {
		Alert('❌ Network error. Please try again.', "red");
		console.error(err);
	}
}

// Event Bindings
elmFormRegister?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormRegister, `${API_BASE}/api/register`, validateRegisterForm);
});

elmFormContact?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormContact, `${API_BASE}/api/contact`, validateContactForm);
});

// Init
elmYear.textContent = getCurrentYear();

const emailReversed = 'ua.gro.ssehclaicosenabsirb@eettimmoc'; // reversed
const email = emailReversed.split('').reverse().join('');
elmEmailElements.forEach((el) => {
	if (el.getAttribute('data-email-href') !== null) {
		el.href = `mailto:${email}`;
	}
	if (el.getAttribute('data-email-content') !== null) {
		el.textContent = email;
	}
});

window.addEventListener('message', (e) => {
	if (e.origin !== 'https://www.chess.com') return;
	if (e.data?.id && typeof e.data?.frameHeight === 'number') {
		const iframe = document.getElementById(e.data.id);
		if (iframe) {
			const IFRAME_HEIGHT_OFFSET = 37; // Extra height to account for container padding/borders.
			iframe.style.height = `${e.data.frameHeight + IFRAME_HEIGHT_OFFSET}px`;
		}
	}
});

// Events
if (elmToggleBtn && elmMenu) {
	elmToggleBtn.addEventListener('click', () => {
		elmMenu.classList.toggle('hidden');
		const isExpanded = !elmMenu.classList.contains('hidden');
		elmToggleBtn.setAttribute('aria-expanded', isExpanded);
	});
}
