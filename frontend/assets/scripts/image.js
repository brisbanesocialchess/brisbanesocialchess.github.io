// ===========================================
// Image Modal (Scoped in IIFE to avoid conflicts)
// ===========================================
(() => {
	/**
	 * Creates and opens an accessible image modal.
	 * @param {HTMLImageElement} imgEl - The clicked image element.
	 */
	function openModal(imgEl) {
		// Save the previously focused element
		const previousActiveElement = document.activeElement;

		// 1. Overlay
		const overlay = document.createElement('div');
		overlay.className = 'fixed inset-0 bg-black/85 flex items-center justify-center z-[9999]';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.setAttribute('aria-label', imgEl.alt || 'Image viewer');

		// 2. Container
		const modalContainer = document.createElement('div');
		modalContainer.className = 'relative flex items-center justify-center h-[80%] w-full p-4';

		// 3. Image
		const modalImage = document.createElement('img');
		modalImage.src = imgEl.src;
		modalImage.alt = imgEl.alt;
		modalImage.className = 'max-w-full max-h-full object-contain rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] animate-fade-in';

		// 4. Close Button
		const closeButton = document.createElement('button');
		closeButton.className =
			'absolute top-4 right-6 text-white text-3xl bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-125';
		closeButton.setAttribute('aria-label', 'Close image viewer');
		closeButton.textContent = '×';

		// --- Assemble and Append ---
		modalContainer.append(modalImage, closeButton);
		overlay.appendChild(modalContainer);
		document.body.appendChild(overlay);

		// Disable body scroll while modal is active
		document.body.style.overflow = 'hidden';

		// --- Focus Handling ---
		closeButton.focus();

		/**
		 * Close modal and restore focus + scroll
		 */
		function closeModal() {
			document.body.style.overflow = ''; // restore scroll
			overlay.remove();
			document.removeEventListener('keydown', keyHandler);
			if (previousActiveElement) previousActiveElement.focus(); // return focus
		}

		// --- Event Listeners ---
		closeButton.addEventListener('click', closeModal);

		// Simplified backdrop close
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) closeModal();
		});

		/**
		 * Handles ESC + focus trapping
		 * @param {KeyboardEvent} e
		 */
		function keyHandler(e) {
			if (e.key === 'Escape') {
				closeModal();
				return;
			}

			// Focus trap: keep tabbing inside modal
			if (e.key === 'Tab') {
				const focusableEls = overlay.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
				const focusable = Array.from(focusableEls);
				if (!focusable.length) return;

				const firstEl = focusable[0];
				const lastEl = focusable[focusable.length - 1];

				if (e.shiftKey && document.activeElement === firstEl) {
					e.preventDefault();
					lastEl.focus();
				} else if (!e.shiftKey && document.activeElement === lastEl) {
					e.preventDefault();
					firstEl.focus();
				}
			}
		}
		document.addEventListener('keydown', keyHandler);
	}

	// --- Global Setup (Event Delegation) ---
	document.addEventListener('click', (e) => {
		if (e.target.matches('img.modal-image')) {
			const link = e.target.closest('a');
			if (link) e.preventDefault(); // prevent navigation
			openModal(e.target);
		}
	});
})();
