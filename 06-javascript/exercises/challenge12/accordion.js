function createAccordion(container, data, allowMultipleOpen = false) {
  data.forEach(({ title, content }) => {
    // Create accordion item
    const item = document.createElement('div');
    item.classList.add('accordion-item');

    // Create header
    const header = document.createElement('div');
    header.classList.add('accordion-header');

    const titleElem = document.createElement('h3');
    titleElem.classList.add('accordion-title');
    titleElem.textContent = title;

    const arrow = document.createElement('span');
    arrow.classList.add('accordion-arrow');
    arrow.innerHTML = '&#9654;'; // Right arrow ▶

    header.appendChild(titleElem);
    header.appendChild(arrow);

    // Create content container
    const contentElem = document.createElement('div');
    contentElem.classList.add('accordion-content');

    const contentParagraph = document.createElement('p');
    contentParagraph.textContent = content;

    contentElem.appendChild(contentParagraph);

    // Append header and content to item
    item.appendChild(header);
    item.appendChild(contentElem);

    // Append item to container
    container.appendChild(item);

    // Toggle function
    header.addEventListener('click', () => {
      const isOpen = contentElem.style.height && contentElem.style.height !== '0px';

      if (!allowMultipleOpen) {
        // Close other open items
        const allContents = container.querySelectorAll('.accordion-content');
        const allArrows = container.querySelectorAll('.accordion-arrow');
        allContents.forEach((c, i) => {
          if (c !== contentElem) {
            c.style.height = '0';
            c.classList.remove('open');
            allArrows[i].classList.remove('rotate');
          }
        });
      }

      if (isOpen) {
        // Close this item
        contentElem.style.height = '0';
        contentElem.classList.remove('open');
        arrow.classList.remove('rotate');
      } else {
        // Open this item (calculate height)
        contentElem.style.height = contentElem.scrollHeight + 'px';
        contentElem.classList.add('open');
        arrow.classList.add('rotate');
      }
    });
  });
}
