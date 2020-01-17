class ListView {
  constructor(
    id,
    itemSelectedHandler,
    itemRemovedHandler,
    itemUpdatedHandler,
    sortHandler,
    removeAllItemsHandler,
  ) {
    this.view = document.querySelector(id);
    this.list = this.view.querySelector('.list');

    this._bindItemSelected(itemSelectedHandler);
    this._bindItemRemoved(itemRemovedHandler);
    this._bindItemUpdated(itemUpdatedHandler);
    this._bindSortHandler(sortHandler);
    this._bindRemoveAllItemsHandler(removeAllItemsHandler);
  }

  show(tasks, sortOption) {
    this._clear();

    let sortSelector = this.view.querySelector('.sort');
    let activeOption = this.view.querySelector(
      `[data-sort-field='${sortOption.field}'][data-sort-order='${sortOption.order}']`,
    );

    sortSelector.value = activeOption.value;

    tasks.forEach(t => this._appendItem(t));
  }

  _clear() {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
  }

  _appendItem(task) {
    let item = this._createItem(
      task.id,
      task.desc,
      task.openDate,
      task.closedDate,
      !task.open,
    );

    this.list.appendChild(item);
  }

  _createItem(id, description, openDate, closedDate, checked) {
    let openDateStr = this._formatDate(openDate);
    let closedDateStr = this._formatDate(closedDate);

    let itemHtml = `<div data-task-id="${id}" class="item">
                        <input class="task-state" type="checkbox"/>
                        <div class="task-description"><span class="task-description-span">${description}</span></div>
                        <div class="task-dates">
                          <p class="task-open-date"><b>${openDateStr}</b></p>
                          <p class="task-closed-date"><b>${closedDateStr}</b></p>
                        </div>
                        <button class="delete">Remove</delete>
                    </div>`;

    let template = document.createElement('template');
    template.innerHTML = itemHtml;

    let item = template.content.firstChild;

    let checkbox = item.children[0];
    checkbox.checked = checked;

    return item;
  }

  _formatDate(date) {
    return date
      ? new Date(date).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      : '';
  }

  _bindItemSelected(handler) {
    this.list.addEventListener('change', e => {
      if (e.target.matches('.task-state')) {
        e.stopPropagation();
        let id = e.target.parentElement.dataset.taskId;
        handler(id);
      }
    });
  }

  _bindItemRemoved(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.matches('.delete')) {
        e.stopPropagation();
        let id = e.target.parentElement.dataset.taskId;
        handler(id);
      }
    });
  }

  _bindItemUpdated(handler) {
    let prevValue = '';
    this.list.addEventListener('dblclick', e => {
      if (e.target.matches('.task-description-span')) {
        let target = e.target;
        let parent = target.parentElement;
        prevValue = target.innerHTML;

        let input = document.createElement('input');
        input.classList.add('task-description-input');

        input.value = target.innerHTML;

        parent.removeChild(target);
        parent.appendChild(input);
      }
    });

    this.list.addEventListener('keyup', e => {
      if (e.target.matches('.task-description-input')) {
        let target = e.target;
        let parent = e.target.parentElement;
        if (e.keyCode == 13) {
          let id = parent.parentElement.dataset.taskId;
          handler(id, target.value);
        }

        if (e.keyCode == 27) {
          let label = document.createElement('span');
          label.classList.add('task-description-span');
          label.innerHTML = prevValue;

          parent.removeChild(target);
          parent.appendChild(label);
        }
      }
    });
  }

  _bindSortHandler(handler) {
    let sortSelector = this.view.querySelector('.sort');

    sortSelector.addEventListener('change', e => {
      let sortField = e.target.selectedOptions[0].dataset.sortField;
      let sortOrder = e.target.selectedOptions[0].dataset.sortOrder;

      handler(sortField, sortOrder);
    });
  }

  _bindRemoveAllItemsHandler(handler) {
    let link = this.view.querySelector('.clear-items');

    link.addEventListener('click', e => handler());
  }
}

export default ListView;
