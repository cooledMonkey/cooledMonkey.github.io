import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from "../framework/render.js";
import {Status, StatusLabel} from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';


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
        this.boardTasks = [...this.#tasksModel.getTasks()];
        render(this.#boardComponent, this.#boardContainer);
        const taskListComponentBacklog = new TaskListComponent({status: Status.BACKLOG, label: StatusLabel[Status.BACKLOG]});
        render(taskListComponentBacklog, this.#boardComponent.getElement());
        const taskListComponentProcessing = new TaskListComponent({status: Status.PROCESSING, label: StatusLabel[Status.PROCESSING]});
        render(taskListComponentProcessing, this.#boardComponent.getElement());
        const taskListComponentDone = new TaskListComponent({status: Status.DONE, label: StatusLabel[Status.DONE]});
        render(taskListComponentDone, this.#boardComponent.getElement());
        const taskListComponentBasket = new TaskListComponent({status: Status.BASKET, label: StatusLabel[Status.BASKET]});
        render(taskListComponentBasket, this.#boardComponent.getElement());

        let i = 0;
        for(i = 0; i < this.boardTasks.length; i++){
            if(this.boardTasks[i].status == Status.BACKLOG){
                const taskComponent = new TaskComponent({task: this.boardTasks[i]});
                render(taskComponent, taskListComponentBacklog.getElement());
            }
            if(this.boardTasks[i].status == Status.PROCESSING){
                const taskComponent = new TaskComponent({task: this.boardTasks[i]});
                render(taskComponent, taskListComponentProcessing.getElement());
            }
            if(this.boardTasks[i].status == Status.DONE){
                const taskComponent = new TaskComponent({task: this.boardTasks[i]});
                render(taskComponent, taskListComponentDone.getElement());
            }
            if(this.boardTasks[i].status == Status.BASKET){
                const taskComponent = new TaskComponent({task: this.boardTasks[i]});
                render(taskComponent, taskListComponentBasket.getElement());
            }
        }
        
        render(new ClearButtonComponent(), taskListComponentBasket.getElement());
    }
}

