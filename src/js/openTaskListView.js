import ListView from './listView.js';

class OpenTaskListView {
  constructor(
    itemSelectedHandler,
    itemRemovedHandler,
    itemUpdateHandler,
    sortHandler,
    removeAllItemsHandler,
  ) {
    this.id = '#open-tasks-view';
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

export default OpenTaskListView;
