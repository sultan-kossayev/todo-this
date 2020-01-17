import Task from './task.js';

class TaskService {
  constructor(storage) {
    this.storage = storage;
  }

  createTask(desc) {
    let task = new Task({ desc: desc, open: true });

    this.storage.saveTask(task);
  }

  removeTask(id) {
    this.storage.removeTaskById(id);
  }

  updateTaskDesc(id, desc) {
    let task = this.storage.findTaskById(id);
    task.updateDesc(desc);

    this.storage.saveTask(task);
  }

  getOpenTasks(descFilter = '') {
    let openTasks = this.storage
      .getTasks()
      .filter(t => t.open)
      .filter(t => t.desc.includes(descFilter));

    let sortOption = this.storage.getSortOptionForOpenTasks();

    return this._sort(openTasks, sortOption, t => t.openDate, t => t.desc);
  }

  getClosedTasks(descFilter = '') {
    let closedTasks = this.storage
      .getTasks()
      .filter(t => !t.open)
      .filter(t => t.desc.includes(descFilter));

    let sortOption = this.storage.getSortOptionForClosedTasks();

    return this._sort(closedTasks, sortOption, t => t.closedDate, t => t.desc);
  }

  toggleTaskState(id) {
    let task = this.storage.findTaskById(id);
    task.toggle();

    this.storage.saveTask(task);
  }

  sortOpenTasks(sortField, sortOrder) {
    this.storage.setSortOptionForOpenTasks(sortField, sortOrder);

    return this.getOpenTasks();
  }

  sortClosedTasks(sortField, sortOrder) {
    this.storage.setSortOptionForClosedTasks(sortField, sortOrder);

    return this.getClosedTasks();
  }

  getSortOptionForOpenTasks() {
    return this.storage.getSortOptionForOpenTasks();
  }

  getSortOptionForClosedTasks() {
    return this.storage.getSortOptionForClosedTasks();
  }

  removeOpenTasks() {
    this.getOpenTasks().forEach(t => this.removeTask(t.id));
  }

  removeClosedTasks() {
    this.getClosedTasks().forEach(t => this.removeTask(t.id));
  }

  _sort(list, sortOption, dateProvider, descProvider) {
    let fieldProvider =
      sortOption.field === 'date' ? dateProvider : descProvider;

    let order = sortOption.order;

    let sorted = list.sort(function(item1, item2) {
      if (order === 'desc') {
        return fieldProvider(item1) > fieldProvider(item2) ? -1 : 1;
      } else {
        return fieldProvider(item1) > fieldProvider(item2) ? 1 : -1;
      }
    });

    return sorted;
  }
}

export default TaskService;
