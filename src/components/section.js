export default class Section {
  constructor( { renderer }, containerSelector) {
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  addSection(cards) {
    this.clear();

    cards.forEach( (element) => {
      this.addItem(element); 
    });
  }

  addItem(item) {
    const element = this.renderer(item);
    this.container.prepend(element);
  }

  clear() {
    this.container.innerHTML = '';
  }

  // clear() {
  //   this.container.innerHTML = '';
  // }
}