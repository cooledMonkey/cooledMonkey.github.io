import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import { RenderPosition, render } from "./framework/render.js";
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js'

const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.add-task-section');
const taskBoardContainer = document.querySelector(".table-task-section")
const taskModel = new TaskModel();

const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer, 
    tasksModel: taskModel,
});


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormComponent(), formContainer, RenderPosition.BEFOREBEGIN);

taskBoardPresenter.init();




