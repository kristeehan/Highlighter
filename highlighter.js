/**
 * Highlighter.js
 *
 * A simple JavaScript class to highlight elements on a webpage with an overlay effect.
 *
 * Usage:
 * const highlighter = new Highlighter({
 *  overlayColor: 'rgba(0, 0, 0, 0.6)',
 *  zIndex: 9999
 * });
 *
 * highlighter.highlight(document.querySelector('selector'));
 *
 * This will create an overlay around the selected element, dimming the rest of the page.
 * Clicking on the overlay will remove the highlight.
 */
class Highlighter {
  constructor(options = {}) {
    this.overlayColor = options.overlayColor || 'rgba(0, 0, 0, 0.6)';
    this.zIndex = options.zIndex || 9999;
    this.overlays = [];
    this.boundPosition = this.positionOverlays.bind(this);
    this.targetElement = null;
  }

  highlight(element) {
    this.removeHighlight();
    this.targetElement = element;

    this.createOverlays();
    this.positionOverlays(); // Set initial positions

    // Scroll to the element
    this.targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  /**
   * Creates four overlay divs to position around the target element.
   */
  createOverlays() {
    for (let i = 0; i < 4; i++) {
      const div = document.createElement('div');
      Object.assign(div.style, {
        position: 'absolute',
        backgroundColor: this.overlayColor,
        zIndex: this.zIndex,
        pointerEvents: 'auto',
      });
      div.addEventListener("click", () => {
        this.removeHighlight();
      });
      document.body.appendChild(div);
      this.overlays.push(div);
    }
  }

  /**
   * Positions and size of the overlay divs based on the target element's position.
   * This method is called on scroll and resize events.
   * It calculates the positions of the overlays relative to the target element.
   * The overlays are positioned to cover the area around the target element.
   * The top overlay covers the area above the target element,
   * the bottom overlay covers the area below it,
   * the left overlay covers the area to the left of it,
   * and the right overlay covers the area to the right of it.
   */
  positionOverlays() {
    if (!this.targetElement) return;

    const rect = this.targetElement.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    const { innerWidth: width, innerHeight: height } = window;

    const elementTop = rect.top + scrollY;
    const elementLeft = rect.left + scrollX;
    const elementRight = rect.right + scrollX;
    const elementBottom = rect.bottom + scrollY;

    const positions = [
      { top: 0, left: 0, width: '100%', height: elementTop }, // Top
      { top: elementBottom, left: 0, width: '100%', height: document.body.scrollHeight - elementBottom }, // Bottom
      { top: elementTop, left: 0, width: elementLeft, height: rect.height }, // Left
      { top: elementTop, left: elementRight, width: window.innerWidth - rect.right, height: rect.height } // Right
    ];

    this.overlays.forEach((div, i) => {
      const pos = positions[i];
      Object.assign(div.style, {
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        width: typeof pos.width === 'number' ? `${pos.width}px` : pos.width,
        height: typeof pos.height === 'number' ? `${pos.height}px` : pos.height
      });
    });
  }

  /**
   * Removes the highlight by removing all overlay divs from the document.
   * It also clears the target element reference.
   */
  removeHighlight() {
    this.overlays.forEach(div => div.remove());
    this.overlays = [];
    this.targetElement = null;
  }
}

export default Highlighter;
