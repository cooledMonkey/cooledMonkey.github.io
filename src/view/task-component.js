import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<li class = "table-tasks__item table-tasks__backlog">Выучить JS</li>`
      );
}


export default class TaskComponent {
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
