import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import { RenderPosition, render } from "./framework/render.js";
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js'
import ClearButtonComponent from './view/clear-button-component.js';
import TasksApiService from './tasks-api-service.js';
import LoadingViewComponent from './view/loading-view-component.js';

const END_POINT = "https://68f21087b36f9750deeb4318.mockapi.io"
const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.add-task-section');
const taskBoardContainer = document.querySelector(".table-task-section")
const taskModel = new TaskModel({tasksApiService: new TasksApiService(END_POINT)});

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




