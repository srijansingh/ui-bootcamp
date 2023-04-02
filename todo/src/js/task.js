import Storage from "./storage";

export default class Task extends Storage {
  constructor() {
    super();
    this._persistKey = "TASK";
    this._task = {};
    this.init();
  }

  init() {
    this._task = this.getPersistedData();
  }

  createTask(taskTitle) {
    const taskId = Math.floor(Math.random() * 999);
    const task = {
      id: taskId,
      title: taskTitle,
      isCompleted: false,
    };
    this._task[taskId] = task;
    this.persistData();
    return task;
  }

  completeTask(id) {
    if (this._task[id]) {
      this._task[id].isCompleted = true;
      this.persistData();
    }
  }

  deleteTask(id) {
    if (this._task[id]) {
      delete this._task[id];
      this.persistData();
    }
  }

  getAllTask() {
    return this._task;
  }

  getCompletedTask() {
    let completedTask = {};
    Object.keys(this._task).forEach((key) => {
      if (this._task[key].isCompleted) {
        completedTask[key] = this._task[key];
      }
    });
    return completedTask;
  }

  getPendingTask() {
    let pendingTask = {};
    Object.keys(this._task).forEach((key) => {
      if (!this._task[key].isCompleted) {
        pendingTask[key] = this._task[key];
      }
    });
    return pendingTask;
  }

  persistData() {
    this.setItem(this._persistKey, this._task);
  }

  getPersistedData() {
    return this.getItem(this._persistKey);
  }
}
