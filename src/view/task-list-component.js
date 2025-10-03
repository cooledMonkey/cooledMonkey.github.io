import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate(status, label) {
    return (
        `<section> <div class="table-header__item table-header__${status}">${label}</div></section>`
      );
}


export default class TaskListComponent extends AbstractComponent{

    constructor({status, label}){
      super();
        this.status = status;
        this.label = label;
    }

  get template(){
        return createHeaderComponentTemplate(this.status, this.label);
  }

}
