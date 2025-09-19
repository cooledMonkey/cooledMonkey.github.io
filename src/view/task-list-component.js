import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate(status, label) {
    return (
        `<section> <div class="table-header__item table-header__${status}">${label}</div></section>`
      );
}


export default class TaskListComponent {

    constructor({status, label}){
        this.status = status;
        this.label = label;
    }

  getTemplate() {
    return createHeaderComponentTemplate(this.status, this.label);
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
