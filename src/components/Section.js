export default class Section {
  constructor( { renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addSection(cards) {
    this.clear();

    cards.forEach( (element) => {
      this.addItem(element); 
    });
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }
}