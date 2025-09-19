import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { RenderPosition, render } from "./framework/render.js";

const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.add-task-section');
const boardContainer = document.querySelector('.add-task-section');

const boardComponent = new TaskBoardComponent();

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormComponent(), formContainer, RenderPosition.BEFOREBEGIN);

render(boardComponent, boardContainer);


let i = 0;
for(i = 0; i < 4; i++){
    let taskListComponent = new TaskListComponent();
    render(taskListComponent, boardComponent.getElement());
    let j = 0;
    for(j = 0; j < 3; j++){
        render(new TaskComponent(), taskListComponent.getElement());
    }
}

