import Task from './task.js';
import SortOption from './../sortOption/sortOption.js';

class TaskStorage {
  constructor() {
    this.name = 'todo-tasks';

    this._init();
  }

  saveTask(task) {
    let data = this._unserialize();

    let tasks = data.tasks.filter(t => t.id !== task.id);
    tasks.push(task);

    data.tasks = tasks;
    this._serialize(data);
  }

  removeTaskById(id) {
    let data = this._unserialize();

    let tasks = data.tasks.filter(t => t.id !== id);

    data.tasks = tasks;
    this._serialize(data);
  }

  getTasks() {
    let data = this._unserialize();
    let tasks = data.tasks.map(t => new Task(t));

    return tasks;
  }

  findTaskById(id) {
    return this.getTasks().find(t => t.id === id);
  }

  setSortOptionForOpenTasks(field, order) {
    let data = this._unserialize();
    data.sortOpenBy.field = field;
    data.sortOpenBy.order = order;

    this._serialize(data);
  }

  getSortOptionForOpenTasks() {
    let opt = this._unserialize().sortOpenBy;

    return new SortOption(opt.field, opt.order);
  }

  setSortOptionForClosedTasks(field, order) {
    let data = this._unserialize();
    data.sortClosedBy.field = field;
    data.sortClosedBy.order = order;

    this._serialize(data);
  }

  getSortOptionForClosedTasks() {
    let opt = this._unserialize().sortClosedBy;

    return new SortOption(opt.field, opt.order);
  }

  _init() {
    let data = this._unserialize();

    if (!data) {
      data = {};
      data.tasks = [];
      data.sortOpenBy = {
        field: 'date',
        order: 'asc',
      };

      data.sortClosedBy = {
        field: 'date',
        order: 'asc',
      };

      this._serialize(data);
    }
  }

  _serialize(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }

  _unserialize() {
    let data = JSON.parse(localStorage.getItem(this.name));

    return data;
  }
}

export default TaskStorage;
