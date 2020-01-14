import ListView from './listView.js';

class OpenTaskListView {
  constructor(
    taskSelectedHandler,
    taskRemovedHandler,
    itemUpdateHandler,
    sortHandler,
  ) {
    this.id = '#open-tasks-view';
    this.view = new ListView(
      this.id,
      taskSelectedHandler,
      taskRemovedHandler,
      itemUpdateHandler,
      sortHandler,
    );
  }

  show(tasks, sortOption) {
    this.view.show(tasks, sortOption);
  }
}

export default OpenTaskListView;
