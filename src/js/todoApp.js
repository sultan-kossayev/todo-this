import './../style.css';
import CreateTaskView from './createTaskView.js';
import OpenTaskListView from './openTaskListView.js';
import ClosedTaskListView from './closedTaskListView.js';
import SearchBoxView from './searchBoxView.js';
import TaskService from './taskService.js';
import Storage from './storage.js';

class TodoApp {
  constructor() {
    this.searchBoxView = new SearchBoxView(
      this.handleSearchTasksRequest.bind(this),
    );

    this.createTaskView = new CreateTaskView(
      this.handleCreateTaskRequest.bind(this),
    );

    this.openTaskListView = new OpenTaskListView(
      this.handleSelectTaskRequest.bind(this),
      this.handleRemoveTaskRequest.bind(this),
      this.handleUpdateTaskDescriptionRequest.bind(this),
      this.handleSortOpenTasksRequest.bind(this),
      this.handleRemoveOpenTasksRequest.bind(this),
    );

    this.closedTaskListView = new ClosedTaskListView(
      this.handleSelectTaskRequest.bind(this),
      this.handleRemoveTaskRequest.bind(this),
      this.handleUpdateTaskDescriptionRequest.bind(this),
      this.handleSortClosedTasksRequest.bind(this),
      this.handleRemoveClosedTasksRequest.bind(this),
    );

    this.taskService = new TaskService(new Storage());

    this._render();
  }

  handleCreateTaskRequest(taskDescription) {
    this.taskService.createTask(taskDescription);

    this._render();
  }

  handleSelectTaskRequest(id) {
    this.taskService.toggleTaskState(id);

    this._render();
  }

  handleRemoveTaskRequest(id) {
    this.taskService.removeTask(id);

    this._render();
  }

  handleUpdateTaskDescriptionRequest(id, newDescription) {
    this.taskService.updateTaskDesc(id, newDescription);

    this._render();
  }

  handleSortOpenTasksRequest(sortField, sortOrder) {
    let sorted = this.taskService.sortOpenTasks(sortField, sortOrder);

    this._render();
  }

  handleSortClosedTasksRequest(sortField, sortOrder) {
    let sorted = this.taskService.sortClosedTasks(sortField, sortOrder);

    this._render();
  }

  handleSearchTasksRequest(searchText) {
    this._render(searchText);
  }

  handleRemoveOpenTasksRequest() {
    this.taskService.removeOpenTasks();

    this._render();
  }

  handleRemoveClosedTasksRequest() {
    this.taskService.removeClosedTasks();

    this._render();
  }

  _render(descFilter = '') {
    this.openTaskListView.show(
      this.taskService.getOpenTasks(descFilter),
      this.taskService.getSortOptionForOpenTasks(),
    );

    this.closedTaskListView.show(
      this.taskService.getClosedTasks(descFilter),
      this.taskService.getSortOptionForClosedTasks(),
    );
  }
}

new TodoApp();
