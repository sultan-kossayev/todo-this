import ListView from './listView.js';

class ClosedTaskListView {
  constructor(
    itemSelectedHandler,
    itemRemovedHandler,
    itemUpdateHandler,
    sortHandler,
    removeAllItemsHandler,
  ) {
    this.id = '#closed-tasks-view';
    this.view = new ListView(
      this.id,
      itemSelectedHandler,
      itemRemovedHandler,
      itemUpdateHandler,
      sortHandler,
      removeAllItemsHandler,
    );
  }

  show(tasks, sortOption) {
    this.view.show(tasks, sortOption);
  }
}

export default ClosedTaskListView;
