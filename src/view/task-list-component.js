import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `
        <section> <div class="table-header__item table-header__backlog">Бэклог</div></section>`
      );
}


export default class TaskListComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
