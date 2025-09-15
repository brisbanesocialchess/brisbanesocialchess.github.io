// ======================
// Const variables
// ======================

/** Base API URL for backend requests */
const API_BASE = 'https://cfsite.brisbanesocialchess.workers.dev';

/** Minimum allowed user age for registration */
const MIN_AGE = 5;

/** Maximum allowed user age for registration */
const MAX_AGE = 120;

/** Available theme modes: dark, light, and random */
const THEMES = ['dark', 'light', 'random'];

// ======================
// Setup
// ======================

/**
 * Load the user's preferred theme from localStorage,
 * fallback to 'dark' if none exists.
 */
let currentTheme = localStorage.getItem('theme') || 'dark';

// ======================
// Elements
// ======================

/** Button to toggle the menu (mobile, sidebar, etc.) */
const elmMenuToggleButton = document.querySelector('#menu-toggle');

/** Menu element that opens/closes */
const elmMenu = document.querySelector('#menu');

/** Element to display the current year (e.g., footer) */
const elmYear = document.querySelector('#year');

/** Registration form element */
const elmFormRegister = document.querySelector('.form-registration');

/** Contact form element */
const elmFormContact = document.querySelector('.form-contact');

/** All elements where obfuscated emails should be revealed */
const elmEmailElements = document.querySelectorAll('.email-obfuscated');

/** Button to toggle between dark, light, and random themes */
const elmThemeToggleButton = document.querySelector('#theme-toggle');

// ======================
// Utilities
// ======================

/**
 * Returns the current year as a number.
 * Useful for dynamic copyright text or age validation.
 * @returns {number} The current year (e.g., 2025).
 */
function getCurrentYear() {
	return new Date().getFullYear();
}

/**
 * Generates a random RGB color string.
 * Example output: "rgb(123, 45, 200)".
 * @returns {string} Randomly generated RGB color.
 */
function randomColor() {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);
	return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Calculates the relative luminance of an RGB color.
 * Uses the WCAG formula to measure brightness perception.
 * @param {number} red - Red channel (0–255).
 * @param {number} green - Green channel (0–255).
 * @param {number} blue - Blue channel (0–255).
 * @returns {number} Relative luminance (0 = dark, 1 = bright).
 */
function luminance(red, green, blue) {
	const values = [red, green, blue].map((value) => {
		const srgb = value / 255;
		return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
	});
	return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

/**
 * Resets custom CSS variables set by random theme
 */
function resetThemeOverrides() {
	const root = document.documentElement.style;
	root.removeProperty('--bg-color');
	root.removeProperty('--text-color');
	root.removeProperty('--reverse-text-color');
	root.removeProperty('--toggle-icon-color');
	root.removeProperty('--toggle-icon-hover');
	root.removeProperty('--role-shadow-rgb');
}

/**
 * Generates two random colors that have sufficient contrast.
 * Ensures the contrast ratio (per WCAG guidelines) is > 4.5
 * for readability between background and text.
 * @returns {[string, string]} A pair of contrasting RGB colors.
 */
function getContrastingPair() {
	let color1 = randomColor();
	let color2 = randomColor();
	let contrast = 0;
	let valid = false;

	while (!valid) {
		const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
		const [r2, g2, b2] = color2.match(/\d+/g).map(Number);
		const lum1 = luminance(r1, g1, b1);
		const lum2 = luminance(r2, g2, b2);

		contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
		if (contrast > 4.5) {
			valid = true;
		} else {
			color1 = randomColor();
			color2 = randomColor();
		}
	}

	return [color1, color2];
}

/**
 * Validate if a string is a valid RGB color like "rgb(123, 45, 67)".
 * @param {string} color
 * @returns {boolean}
 */
function isValidRgb(color) {
	if (!color) return false;
	const match = color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
	if (!match) return false;
	return match.slice(1, 4).every((n) => parseInt(n, 10) >= 0 && parseInt(n, 10) <= 255);
}

/**
 * Get stored random colors or generate a new pair if invalid/missing.
 * @returns {[string, string]} [background, text]
 */
function getStoredRandomColors(forceNew = false) {
	if (!forceNew) {
		const stored = JSON.parse(localStorage.getItem('randomColors') || 'null');

		if (stored?.bg && stored?.text && isValidRgb(stored.bg) && isValidRgb(stored.text)) {
			return [stored.bg, stored.text];
		}
	}

	const [bg, text] = getContrastingPair();
	localStorage.setItem('randomColors', JSON.stringify({ bg, text }));
	return [bg, text];
}

/**
 * Apply stored random theme
 */
function applyStoredRandomTheme(forceNew = false) {
	const [bg, text] = getStoredRandomColors(forceNew);
	document.documentElement.style.setProperty('--bg-color', bg);
	document.documentElement.style.setProperty('--text-color', text);
	document.documentElement.style.setProperty('--reverse-text-color', bg);
	document.documentElement.style.setProperty('--toggle-icon-color', text);
	document.documentElement.style.setProperty('--toggle-icon-hover', bg);
	document.documentElement.style.setProperty('--role-shadow-rgb', text.match(/\d+/g).join(', '));
}

/**
 * Displays an alert message with a list of validation errors.
 * @param {string[]} errors - The list of error messages.
 */
function showAlert(errors) {
	if (errors.length === 1) alert(`Please fix the error: ${errors.join(' ')}`);
	else alert(`Please fix the following:\n- ${errors.join('\n- ')}`);
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
			alert('✅ Submission successful!');
			form.reset();
		} else {
			const defaultErrorMessage = 'Something went wrong.';
			try {
				const result = await response.json();
				const errorMessage = result.message || defaultErrorMessage;
				alert(`❌ Error: ${errorMessage}`);
			} catch (e) {
				console.error('Error parsing JSON response:', e);
				alert(`❌ Error: ${defaultErrorMessage}`);
			}
		}
	} catch (err) {
		alert('❌ Network error. Please try again.');
		console.error(err);
	}
}

// ======================
// Event Bindings
// ======================

/** Registration form submit */
elmFormRegister?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormRegister, `${API_BASE}/api/register`, validateRegisterForm);
});

/** Contact form submit */
elmFormContact?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormContact, `${API_BASE}/api/contact`, validateContactForm);
});

// ======================
// Init
// ======================

/** Apply the stored theme immediately */
document.documentElement.setAttribute('data-theme', currentTheme);

/** Apply random theme immediately if chosen */
if (currentTheme === 'random') applyStoredRandomTheme(false);

/** Insert current year into footer */
elmYear.textContent = getCurrentYear();

/** Decode obfuscated email (reversed string) */
const emailReversed = 'moc.liamg@ssehclaicosenabsirb';
const email = emailReversed.split('').reverse().join('');
elmEmailElements.forEach((el) => {
	if (el.getAttribute('data-email-href') !== null) {
		el.href = `mailto:${email}`;
	}
	if (el.getAttribute('data-email-content') !== null) {
		el.textContent = email;
	}
});

/** Auto-resize embedded chess.com iframe */
window.addEventListener('message', (e) => {
	if (e.origin !== 'https://www.chess.com') return;
	if (e.data?.id && typeof e.data?.frameHeight === 'number') {
		const iframe = document.getElementById(e.data.id);
		if (iframe) {
			const IFRAME_HEIGHT_OFFSET = 37; // Extra height for padding/borders
			iframe.style.height = `${e.data.frameHeight + IFRAME_HEIGHT_OFFSET}px`;
		}
	}
});

// ======================
// Events
// ======================

/** Toggle menu expand/collapse */
if (elmMenuToggleButton && elmMenu) {
	elmMenuToggleButton.addEventListener('click', () => {
		elmMenu.classList.toggle('hidden');
		const isExpanded = !elmMenu.classList.contains('hidden');
		elmMenuToggleButton.setAttribute('aria-expanded', isExpanded);
	});
}

/** Cycle through themes (dark → light → random → dark...) */
if (elmThemeToggleButton) {
	elmThemeToggleButton.addEventListener('click', () => {
		let index = THEMES.indexOf(currentTheme);
		index = (index + 1) % THEMES.length;
		currentTheme = THEMES[index];

		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('theme', currentTheme);

		if (currentTheme === 'random') {
			applyStoredRandomTheme(true);
		} else {
			resetThemeOverrides();
		}
	});
}
