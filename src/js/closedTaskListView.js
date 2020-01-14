import ListView from './listView.js';

class ClosedTaskListView {
  constructor(
    itemSelectedHandler,
    taskRemovedHandler,
    itemUpdateHandler,
    sortHandler,
  ) {
    this.id = '#closed-tasks-view';
    this.view = new ListView(
      this.id,
      itemSelectedHandler,
      taskRemovedHandler,
      itemUpdateHandler,
      sortHandler,
    );
  }

  show(tasks, sortOption) {
    this.view.show(tasks, sortOption);
  }
}

export default ClosedTaskListView;
