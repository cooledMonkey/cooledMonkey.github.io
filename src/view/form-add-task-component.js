import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `    <form class = "add-task-form">
        <label class="add-task-form__label">Новая задача</label><br>
        <input type = "text" value = "Название задачи..." class = "add-task-form__input">
        <input type = "submit" value = "+ Добавить" class = "add-task-form__button">
    </form>`
      );
}


export default class FormComponent {
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
