import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from "../framework/render.js";
import {Status, StatusLabel} from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugComponent from '../view/plug-component.js';

export default class TaskBoardPresenter{
    #boardComponent = new TaskBoardComponent();
    #tasksModel = null;
    #boardContainer = null;

    #boardTasks = [];

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel; 

    }

    init(){
        this.boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    createTask(){
        const taskTitle = document.querySelector('#add-task').value.trim();
        if(!taskTitle){
            return;
        }
        this.#tasksModel.addTask(taskTitle);

        document.querySelector('#add-task').value = '';
    }

    #filterByStatus(tasks, status){
        return tasks.filter(x => {
            return x.status == status;
        });
    }

    #renderTask(task, container){
        const taskComponent = new TaskComponent({task: task});
        render(taskComponent, container);
    }

    #renderClearButton(container){
        render(new ClearButtonComponent(), container);
    }

    #renderPlugElement(container){
        render(new PlugComponent(), container);
    }

    #renderBoard(){
        render(this.#boardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status]});
            render(taskListComponent, this.#boardComponent.element);
            const tasksForStatus = this.#filterByStatus(this.boardTasks, status);
            if(tasksForStatus.length == 0){
                this.#renderPlugElement(taskListComponent.element);
            }
            tasksForStatus.forEach((task) => {
                this.#renderTask(task, taskListComponent.element);
            })
            if(status == "basket"){
                this.#renderClearButton(taskListComponent.element);
            }
        })

    }
}

