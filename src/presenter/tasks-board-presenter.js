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
    #clearButton = null;

    #boardTasks = [];

    constructor({boardContainer, tasksModel, clearButton}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel; 
        this.#clearButton = clearButton;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init(){
        this.boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
        this.#setButtonDisabled();
    }

    createTask(){
        const taskTitle = document.getElementById('add-task').value.trim();
        if(!taskTitle){
            return;
        }
        this.#tasksModel.addTask(taskTitle);

        document.getElementById('add-task').value = '';
    }

    clearBasket(){
        this.#tasksModel.clearBucketModel();
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
        render(this.#clearButton, container);
    }

    #renderPlugElement(container){
        render(new PlugComponent(), container);
    }

    #renderBoard(){
        render(this.#boardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status]});
            render(taskListComponent, this.#boardComponent.element);
            const tasksForStatus = this.#filterByStatus(this.tasks, status);
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
    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
        this.#setButtonDisabled();
    }
    #clearBoard(){
        this.#boardComponent.element.innerHTML = '';
    }
    get tasks(){
        return this.#tasksModel.tasks;
    }
    #setButtonDisabled(){
        const tasksForStatus = this.#filterByStatus(this.tasks, 'basket');
        console.log(tasksForStatus.length);
        if(tasksForStatus.length == 0){
            document.getElementById('clear-button').disabled = true;
        }
        else{
            document.getElementById('clear-button').disabled = false;
        }
    }
}


