import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `<div class="table-tasks">
        </div>`
      );
}


export default class TaskBoardComponent extends AbstractComponent{
  constructor(){
    super();
  }

  get template(){
        return createHeaderComponentTemplate();
  }
}
