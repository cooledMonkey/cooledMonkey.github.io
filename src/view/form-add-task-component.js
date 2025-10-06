import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
    `    <form class = "add-task-form">
        <p class="add-task-form__label">Новая задача</p>
        <input type = "text" placeholder="Название задачи..." id = "add-task" name="input-text1"  class = "add-task-form__input">
        <input type = "submit" value = "+ Добавить" class = "add-task-form__button" name="input-button" >
    </form>`
      );
}


export default class FormComponent extends AbstractComponent{
  #handleClick = null 
  constructor({onClick}){
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template(){
        return createHeaderComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}


