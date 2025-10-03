import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 


function createClearButtonTemplate() {
    return (
        `<button id = "clear-button" class = "table-tasks__clear-button">× Очистить</button>`
      );
}


export default class ClearButtonComponent extends AbstractComponent {
  constructor(){
    super();
  }

  get template(){
        return createClearButtonTemplate();
  }
}
