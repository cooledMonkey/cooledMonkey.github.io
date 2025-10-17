import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate(status, label) {
    return (
        `<section> <div class="table-header__item table-header__${status}">${label}</div></section>`
      );
}


export default class TaskListComponent extends AbstractComponent{

    constructor({status, label, onTaskDrop}){
      super();
        this.status = status;
        this.label = label;
        this.#setDropHandler(onTaskDrop);
    }

  get template(){
        return createHeaderComponentTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop){
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      const activeElement = this.element.querySelector(`.selected`);
      const currentElement = event.target;
      const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`tasks__item`);

      if (!isMoveable) {
        return;
      }

      const getNextElement = (cursorPosition, currentElement) => {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
      const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

  return nextElement;
};



      const nextElement = getNextElement(evt.clientY, currentElement);
        if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }


      tasksListElement.insertBefore(activeElement, nextElement);
    });

      container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');

      onTaskDrop(taskId, this.status);
    })
  }

  
}
