import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from "../framework/render.js";
import {Status, StatusLabel, UserAction} from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugComponent from '../view/plug-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';

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

    async init() {
        const loadingViewComponent = new LoadingViewComponent();
        render(loadingViewComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#clearBoard();
        this.#renderBoard();
        this.#setButtonDisabled();
    }


    async createTask(){
        const taskTitle = document.getElementById('add-task').value.trim();
        if(!taskTitle){
            return;
        }
        try{
            await this.#tasksModel.addTask(taskTitle);
            document.getElementById('add-task').value = "";
        } catch(err){
            console.error('Ошибка при создании задачи: ', err)
        }
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
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status], 
                onTaskDrop: this.#handletaskDrop.bind(this)});
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
        if(document.getElementById("loading-view") != null){
            document.getElementById("loading-view").remove();
        }
    }
    get tasks(){
        return this.#tasksModel.tasks;
    }
    #setButtonDisabled(){
        const tasksForStatus = this.#filterByStatus(this.tasks, 'basket');
        if(tasksForStatus.length == 0){
            document.getElementById('clear-button').disabled = true;
        }
        else{
            document.getElementById('clear-button').disabled = false;
        }
    }
    async #handletaskDrop(taskId, newStatus){
        try{
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch(err){
            console.error('Ошибка при обновлении статуса задачи на сервере: ', err)
        }
        
    }
    #handleModelEvent(event, payload){
        switch(event){
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK: 
                this.#clearBoard();
                this.#renderBoard();
                this.#setButtonDisabled();
                break;
        }
    }

    async #handleClearBasketClick(){
        try{
            await this.#tasksModel.clearBucketModel();
        } catch(err){
            console.error('Ошибка при очистке корзины', err);
        }
    }
}


