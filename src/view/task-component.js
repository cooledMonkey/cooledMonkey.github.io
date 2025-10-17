import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskComponentTemplate(task) {
    const {title, status} = task;
    return (
        `<li class = "table-tasks__item table-tasks__${status}">${title}</li>`
      );
}


export default class TaskComponent extends AbstractComponent{


    constructor({task}){
      super()
        this.task = task;
        this.#afterCreateElement();
        this.#makeTasksSelectable();
    }

    get template(){
      return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement(){
      this.#makeTaskDraggable();
    }

    #makeTaskDraggable(){
      this.element.setAttribute('draggable', true);

      this.element.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', this.task.id);
      })
    }

    #makeTasksSelectable(){
        this.element.addEventListener(`dragstart`, (evt) => {
          evt.target.classList.add(`selected`);
        })

        this.element.addEventListener(`dragend`, (evt) => {
          evt.target.classList.remove(`selected`);
        });
    }
}
