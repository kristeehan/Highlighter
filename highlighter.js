class Highlighter {
    constructor(options = {}) {
      this.overlayColor = options.overlayColor || 'rgba(0, 0, 0, 0.6)';
      this.zIndex = options.zIndex || 9999;
      this.overlays = [];
    }

    highlight(element) {
      this.removeHighlight();

      const rect = element.getBoundingClientRect();
      const { innerWidth: width, innerHeight: height } = window;

      const positions = [
        { top: 0, left: 0, width: '100%', height: rect.top }, // Top
        { top: rect.bottom, left: 0, width: '100%', height: height - rect.bottom }, // Bottom
        { top: rect.top, left: 0, width: rect.left, height: rect.height }, // Left
        { top: rect.top, left: rect.right, width: width - rect.right, height: rect.height } // Right
      ];

      this.overlays = positions.map(pos => {
        const div = document.createElement('div');
        Object.assign(div.style, {
          position: 'fixed',
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          width: typeof pos.width === 'number' ? `${pos.width}px` : pos.width,
          height: typeof pos.height === 'number' ? `${pos.height}px` : pos.height,
          backgroundColor: this.overlayColor,
          zIndex: this.zIndex
        });
        document.body.appendChild(div);
        div.addEventListener("click", () => {
            console.log('here')
            this.removeHighlight();
        })
        return div;
      });
    }

    removeHighlight() {
      this.overlays.forEach(div => div.remove());
      this.overlays = [];
    }
  }

  export default Highlighter;