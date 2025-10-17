import generateID from '../utils.js';
import Observable from '../framework/observable.js';
import { UserAction } from '../const.js';
import { UpdateType } from '../const.js';

export default class TaskModel extends Observable{
    #tasksApiService = null;
    #boardTasks = [];
    #observers = [];

 constructor({tasksApiService}) {
 super();
   this.#tasksApiService = tasksApiService;


   this.#tasksApiService.tasks.then((tasks) => {
     //console.log(tasks);
   });
 }

  async init() {
   try {
     const tasks = await this.#tasksApiService.tasks;
     this.#boardTasks = tasks;
   } catch(err) {
     this.#boardTasks = [];
   }
   this._notify(UpdateType.INIT);
 }




    get tasks(){
        return this.#boardTasks;
    }

    getTasksByStatus(status){
        return this.#boardTasks.filter(task => task.status === status);
    }

    deleteTask(taskId){
      this.#boardTasks = this.#boardTasks.filter(task => task.id != taskId);
      task._notify(UserAction.DELETE_TASK, {id: taskId});
    }

    async clearBucketModel(){
        const basketTasks = this.tasks.filter((x) => x.status === 'basket');
        try{
          await Promise.all(basketTasks.map(task => this.#tasksApiService
            .deleteTask(task.id)
          ));
          this.#boardTasks = this.tasks.filter((x) => x.status !== 'basket');
          this._notifyObservers();
          this._notify(UserAction.DELETE_TASK, {status: 'basket'});
        } catch(err){
          console.error('Ошибка при удалении задач из корзины на сервере', err);
          throw err;
        }
    }

    addObserver(observer){
        this.#observers.push(observer);
    }

    removeObserver(observer){
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }

    async updateTaskStatus(taskId, newStatus){
        const task = this.#boardTasks.find(task => task.id === taskId);
        if(task){
            task.status = newStatus;
            this._notifyObservers();

            try{
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch(err){
                console.error('Ошибка при обновлении статуса задачи на сервере: ', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }
async addTask(title) {
   const newTask = {
     title,
     status: 'backlog',
     id: generateID(),
   };
   try {
     const createdTask = await this.#tasksApiService.addTask(newTask);
     this.#boardTasks.push(createdTask);
     this._notifyObservers();
     this._notify(UserAction.ADD_TASK, createdTask);
     return createdTask;
   } catch (err) {
     console.error('Ошибка при добавлении задачи на сервер:', err);
     throw err;
   }
 }

}