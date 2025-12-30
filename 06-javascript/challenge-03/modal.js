// Modal factory function
const createModal = (() => {
  // Shared modal open count to manage body scroll locking across multiple modals
  let openModalCount = 0;

  return function createModal({ title = '', content = '', buttons = [] }) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    // Create modal container
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Header
    const header = document.createElement('header');
    header.classList.add('modal-header');

    const titleElem = document.createElement('h2');
    titleElem.textContent = title; // safer than innerHTML if no HTML needed
    header.append(titleElem);

    // Close button (X)
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close modal');
    header.append(closeBtn);

    // Content
    const contentElem = document.createElement('div');
    contentElem.classList.add('modal-content');
    if (typeof content === 'string') {
      contentElem.innerHTML = content; // allow HTML if string
    } else if (content instanceof Node) {
      contentElem.append(content);
    }

    // Footer (buttons)
    const footer = document.createElement('footer');
    footer.classList.add('modal-footer');

    buttons.forEach(({ text, type = 'btn-primary', onClick }) => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.className = type;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        if (typeof onClick === 'function') {
          onClick(modalInstance);
        }
      });
      footer.append(btn);
    });

    // Compose modal
    modal.append(header, contentElem, footer);
    overlay.append(modal);

    // Insert into DOM
    document.body.append(overlay);

    // Open function
    const open = () => {
      openModalCount++;
      overlay.classList.add('open');
      modal.classList.add('open');

      // Disable scroll on body if first modal opened
      if (openModalCount === 1) {
        document.body.style.overflow = 'hidden';
      }

      // Focus first button for accessibility
      const firstButton = footer.querySelector('button');
      if (firstButton) firstButton.focus();

      // Listen for Escape key
      document.addEventListener('keydown', handleKeydown);
    };

    // Close function
    const close = () => {
      openModalCount = Math.max(0, openModalCount - 1);
      modal.classList.remove('open');
      overlay.classList.remove('open');

      // Re-enable scroll if no modals open
      if (openModalCount === 0) {
        document.body.style.overflow = '';
      }

      document.removeEventListener('keydown', handleKeydown);
    };

    // Close on overlay click if clicked outside modal box
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Close on X button click
    closeBtn.addEventListener('click', close);

    // Handle Escape key press
    const handleKeydown = (e) => {
      if (e.key === 'Escape') close();
    };

    // Return modal instance object
    const modalInstance = {
      open,
      close,
      overlay,
      modal,
    };

    return modalInstance;
  };
})();
