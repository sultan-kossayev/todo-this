class CreateTaskView {
  constructor(handler) {
    this.description = document.querySelector('#create-task-view input');
    this.submit = document.querySelector('#create-task-view button');

    this._bindHandler(handler);
  }

  _bindHandler(handler) {
    this.submit.addEventListener('click', e => {
      let desc = this.description.value;
      this.description.value = '';

      handler(desc);
    });

    this.description.addEventListener('keydown', e => {
      if (e.keyCode == 13) {
        let desc = this.description.value;
        this.description.value = '';

        handler(desc);
      }
    });
  }
}

export default CreateTaskView;
