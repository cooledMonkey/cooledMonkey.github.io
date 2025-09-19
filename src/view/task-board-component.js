import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<div class="table-tasks">
        </div>`
      );
}


export default class TaskBoardComponent {
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
