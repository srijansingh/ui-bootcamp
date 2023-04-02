import Storage from "./storage";

/**
 * Task class that manages task data using local storage
 */
export default class Task extends Storage {
  /**
   * Constructs a new Task object and initializes it
   */
  constructor() {
    super();
    this._persistKey = "TASK";
    this._task = {};
    this.init();
  }

  /**
   * Initializes the task data from local storage
   */
  init() {
    this._task = this.getPersistedData();
  }

  /**
   * Creates a new task with the given title and adds it to the task list
   * @param {string} taskTitle - The title of the new task
   * @returns {Object} - The created task object
   */
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

  /**
   * Marks the task with the given ID as completed
   * @param {number} id - The ID of the task to mark as completed
   */
  completeTask(id) {
    if (this._task[id]) {
      this._task[id].isCompleted = true;
      this.persistData();
    }
  }

  /**
   * Deletes the task with the given ID from the task list
   * @param {number} id - The ID of the task to delete
   */
  deleteTask(id) {
    if (this._task[id]) {
      delete this._task[id];
      this.persistData();
    }
  }

  /**
   * Returns all tasks in the task list
   * @returns {Object} - The task list
   */
  getAllTask() {
    return this._task;
  }

  /**
   * Returns all completed tasks in the task list
   * @returns {Object} - The completed task list
   */
  getCompletedTask() {
    let completedTask = {};
    Object.keys(this._task).forEach((key) => {
      if (this._task[key].isCompleted) {
        completedTask[key] = this._task[key];
      }
    });
    return completedTask;
  }

  /**
   * Returns all pending tasks in the task list
   * @returns {Object} - The pending task list
   */
  getPendingTask() {
    let pendingTask = {};
    Object.keys(this._task).forEach((key) => {
      if (!this._task[key].isCompleted) {
        pendingTask[key] = this._task[key];
      }
    });
    return pendingTask;
  }

  /**
   * Persists the task data to local storage
   */
  persistData() {
    this.setItem(this._persistKey, this._task);
  }

  /**
   * Retrieves the task data from local storage
   * @returns {Object} - The task data
   */
  getPersistedData() {
    return this.getItem(this._persistKey);
  }
}
