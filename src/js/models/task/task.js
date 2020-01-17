class Task {
  constructor({ id, desc, openDate, open, closedDate }) {
    this.id = id || `id${(+new Date()).toString(16)}`;
    this.desc = desc;
    this.openDate = openDate || new Date();
    this.open = open;
    this.closedDate = closedDate || null;
  }

  toggle() {
    if (this.open) {
      this.closedDate = new Date();
    } else {
      this.openDate = new Date();
      this.closedDate = null;
    }

    this.open = !this.open;
  }

  updateDesc(desc) {
    this.desc = desc;
  }
}

export default Task;
