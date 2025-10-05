// ===========================================
// Image Modal
// ===========================================

/**
 * Creates and opens a secure image modal.
 * @param {HTMLImageElement} imgEl - The clicked image element.
 */
function openModal(imgEl) {
	// 1. Overlay (the dark background)
	const overlay = document.createElement('div');
	overlay.className = 'fixed inset-0 bg-black/85 flex items-center justify-center z-[9999]';

	// 2. Container (for centering and padding)
	const modalContainer = document.createElement('div');
	modalContainer.className = 'relative flex items-center justify-center h-[80%] w-full p-4';

	// 3. Image
	const modalImage = document.createElement('img');
	modalImage.src = imgEl.src;
	modalImage.alt = imgEl.alt;
	modalImage.className = 'max-w-full max-h-full object-contain rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)]  animate-fade-in';

	// 4. Close Button
	const closeButton = document.createElement('button');
	closeButton.className =
		'absolute top-4 right-6 text-white text-3xl bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-125';
	closeButton.setAttribute('aria-label', 'Close image viewer');
	closeButton.textContent = '×';

	// --- Assemble and Append to Body ---
	modalContainer.append(modalImage, closeButton);
	overlay.appendChild(modalContainer);
	document.body.appendChild(overlay);

	// --- Event Handlers for Closing ---
	/**
	 * Closes the modal and removes event listeners.
	 * @returns {void}
	 */
	const closeModal = () => {
		overlay.remove();
		document.removeEventListener('keydown', handleEscKey);
	};

	/**
	 * Handles ESC key press to close modal.
	 * @param {KeyboardEvent} e - The keyboard event.
	 */

	// Close with ESC key
	const handleEscKey = (e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};

	// Close by clicking the button or the overlay backdrop
	closeButton.addEventListener('click', closeModal);
	overlay.addEventListener('click', (e) => {
		if (!modalImage.contains(e.target) && !closeButton.contains(e.target)) {
			closeModal();
		}
	});

	document.addEventListener('keydown', handleEscKey);
}

// --- Global Setup using Event Delegation (More Efficient) ---

// 1. Inject a single CSS rule for the cursor instead of many inline styles.
const style = document.createElement('style');
style.textContent = '.modal-image { cursor: zoom-in; }';
document.head.appendChild(style);

// 2. Add one listener to the document to handle clicks on any .modal-image.
// This is more performant than adding a listener to every image.
document.addEventListener('click', (e) => {
	if (e.target.matches('img.modal-image')) {
		openModal(e.target);
	}
});
