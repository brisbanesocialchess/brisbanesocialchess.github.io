// ======================
// Image Modal (Click to Enlarge)
// Tailwind v4 Compatible
// ======================


    /**
     * Opens an image modal with zoom effect, close button,
     * ESC key handling, and outside click to close.
     * @param {HTMLImageElement} img - The clicked image element.
     */
    function openModal(img) {
      const overlay = document.createElement('div');
      overlay.className = `
        fixed inset-0 bg-black/85 flex items-center justify-center 
        z-[9999]
      `;

      overlay.innerHTML = `
        <div class="relative flex items-center justify-center h-[80%] w-full p-4">
          <img 
            src="${img.src}" 
            alt="${img.alt || ''}" 
            class="max-w-full max-h-full object-contain rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] animate-fade-in"
          >
          <button 
            class="absolute top-4 right-6 text-white text-3xl bg-transparent border-none cursor-pointer 
                   transition-transform duration-200 hover:scale-125"
            aria-label="Close image viewer"
          >
            &times;
          </button>
        </div>
      `;

      document.body.appendChild(overlay);

      const modalContent = overlay.querySelector('img');
      const closeButton = overlay.querySelector('button');

      // Close modal function
      function closeModal() {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }

      // Close with button
      closeButton.addEventListener('click', closeModal);

      // ✅ Close when clicking outside image
      overlay.addEventListener('click', (e) => {
        if (!modalContent.contains(e.target)) {
          closeModal();
        }
      });

      // ✅ Close with ESC key
      function escHandler(e) {
        if (e.key === 'Escape') closeModal();
      }
      document.addEventListener('keydown', escHandler);
    }

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const images = document.querySelectorAll('img.modal-image');

    if (!images.length) return;

    images.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openModal(img));
    });
  }, 500);
});
