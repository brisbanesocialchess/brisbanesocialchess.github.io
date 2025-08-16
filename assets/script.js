// Const variables
const API_BASE = 'https://cfsite.brisbanesocialchess.workers.dev';
const MIN_AGE = 5;
const MAX_AGE = 120;

// Elements
const elmYear = document.getElementById('year');
const elmFormRegister = document.querySelector('.form-registration');
const elmFormContact = document.querySelector('.form-contact');
const elmEmailElements = document.querySelectorAll('.email-obfuscated');

// Utilities
function getCurrentYear() {
	return new Date().getFullYear();
}

function showAlert(errors) {
	if (errors.length === 1) alert('Please fix the error: ' + errors.join(' '));
	else alert('Please fix the following:\n- ' + errors.join('\n- '));
}

function isValidEmail(email) {
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
	return regex.test(email);
}

function validateRegisterForm(data) {
	const errors = [];

	const currentYear = getCurrentYear();

	if (!data.firstName?.trim()) errors.push('First name is required.');
	if (!data.lastName?.trim()) errors.push('Last name is required.');

	const year = data.birthYear ? parseInt(data.birthYear, 10) : NaN;
	const age = currentYear - year;

	if (!data.birthYear?.trim()) errors.push('Birth year is required.');
	else if (isNaN(year)) errors.push('Birth year must be a valid number.');
	else if (age < MIN_AGE || age > MAX_AGE) errors.push(`Age must be between ${MIN_AGE} and ${MAX_AGE} years old.`);

	if (!data.gender) errors.push('Gender is required.');
	if (!data.email?.trim() || !isValidEmail(data.email)) errors.push('Valid email is required.');

	return errors;
}

function validateContactForm(data) {
	const errors = [];

	if (!data.name?.trim()) errors.push('Name is required.');
	if (!data.email?.trim() || !isValidEmail(data.email)) errors.push('Valid email is required.');
	if (!data.subject?.trim()) errors.push('Subject is required.');
	if (!data.message?.trim()) errors.push('Message is required.');

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
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		if (response && response.ok && response.status === 200) {
			alert('✅ Submission successful!');
			form.reset();
		} else {
			const defaultErrorMessage = 'Something went wrong.';
			try {
				const result = await response.json();
				const errorMessage = result.message || defaultErrorMessage;
				alert('❌ Error: ' + errorMessage);
			} catch (e) {
				console.error('Error parsing JSON response:', e);
				alert('❌ Error: ' + defaultErrorMessage);
			}
		}
	} catch (err) {
		alert('❌ Network error. Please try again.');
		console.error(err);
	}
}

// Event Bindings
elmFormRegister?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormRegister, API_BASE + '/api/register', validateRegisterForm);
});

elmFormContact?.addEventListener('submit', async (e) => {
	e.preventDefault();
	await handleFormSubmit(elmFormContact, API_BASE + '/api/contact', validateContactForm);
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
	// Step 1: Security check - Verify the message origin is chess.com
	if (e.origin !== 'https://www.chess.com') {
		return; // Exit if the message is from an untrusted source
	}

	// Step 2: Robustness check - Ensure data and ID exist and frameHeight is a number
	if (e.data?.id && typeof e.data?.frameHeight === 'number') {
		const iframe = document.getElementById(e.data.id);
		// If a matching iframe is found, set its height
		if (iframe) {
			const IFRAME_HEIGHT_OFFSET = 37; // Extra height to account for container padding/borders.
			iframe.style.height = `${e.data.frameHeight + IFRAME_HEIGHT_OFFSET}px`;
		}
	}
});
