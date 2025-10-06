import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import { RenderPosition, render } from "./framework/render.js";
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js'
import ClearButtonComponent from './view/clear-button-component.js';

const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.add-task-section');
const taskBoardContainer = document.querySelector(".table-task-section")
const taskModel = new TaskModel();

const clearButton = new ClearButtonComponent({
  onClick: handleClearButtonClick
});
function handleClearButtonClick(){
    taskBoardPresenter.clearBasket();
}
const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer, 
    tasksModel: taskModel,
    clearButton: clearButton,
});

const formAddTaskComponent = new FormComponent({onClick: handleNewTaskButtonClick});
function handleNewTaskButtonClick(){
    taskBoardPresenter.createTask();
}


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.BEFOREBEGIN);

taskBoardPresenter.init();




