export default class Layout {
  /**
   * @description An array of objects containing the tab id and title.
   * @type {Array}
   * @private
   */
  #tabItems = [
    { id: "all", title: "All" },
    { id: "active", title: "Active Task" },
    { id: "completed", title: "Completed" },
  ];

  /**
   * @description Creates a new TodoList instance.
   * @constructor
   * @param {StateService} stateService - The service that manages the state of the application.
   * @param {HTMLElement} wrapper - The HTML element to which the TodoList instance will be attached.
   */
  constructor(stateService, wrapper) {
    this.stateService = stateService;
    this.wrapper = wrapper;

    this.form = this.wrapper.querySelector("form");
    this.taskInput = this.wrapper.querySelector('input[name="task"]');
    this.tab = this.wrapper.querySelector("#tab");
    this.tabContent = this.wrapper.querySelector("#tab-content");
    this.activeTab = "all";
    this.render();
    this.bindEvents();
  }

  /**
   * @description Binds event listeners to relevant DOM elements.
   */
  bindEvents() {
    // Form Submit event
    this.form.addEventListener("submit", this.submitTask.bind(this));
    // Tab click event
    this.tab.addEventListener("click", this.handleTabClick.bind(this));
    // Remove and complete click events
    this.tabContent.addEventListener("click", this.handleTaskClick.bind(this));
  }

  /**
   * @description Handle a click event on a task button or checkbox.
   * @param {Event} event - The event object.
   */
  handleTaskClick(e) {
    const elem = e.target;
    const taskType = elem.name;
    const taskFunctions = {
      completeTask: (id) => {
        this.stateService.completeTask(id);
        elem.checked = true;
        elem.disabled = true;
        this.renderTodos();
      },
      removeTask: (id) => {
        this.stateService.deleteTask(id);
        e.target.parentElement.remove();
      },
    };

    const taskFunction = taskFunctions[taskType];
    if (taskFunction) {
      const id = e.target.value || e.target.id;
      taskFunction(id);
    }
  }

  /**
   * @description Handle a click event on a tab.
   * @param {Event} event - The event object.
   */
  handleTabClick(e) {
    const newTab = e.target.id;
    const activeTabElement = this.tab.querySelector(`#${this.activeTab}`);
    const newTabElement = this.tab.querySelector(`#${newTab}`);

    if (activeTabElement && newTabElement && newTab !== this.activeTab) {
      activeTabElement.classList.remove("active");
      newTabElement.classList.add("active");
      this.activeTab = newTab;
      this.renderTodos();
    }
  }

  /**
   * @description Handle the submission of a new task.
   * @param {Event} event - The event object.
   */
  submitTask(e) {
    e.preventDefault();
    if (this.taskInput.value) {
      const task = this.stateService.createTask(this.taskInput.value);
      this.taskInput.value = "";
      this.taskInput.focus();
      this.addTodos(task);
    }
  }

  /**
   * @description Render tab items to the UI.
   * @param {Object} tabItems - The tab items to be rendered.
   * @param {string} tabItems.title - The title of the tab item.
   * @param {string} tabItems.id - The unique identifier of the tab item.
   */
  renderTab(tabItems) {
    const tabFragment = document.createDocumentFragment();
    Object.keys(tabItems).forEach((item) => {
      const button = document.createElement("button");
      button.className = "nav-link";
      button.id = tabItems[item].id;
      button.role = "tab";
      button.textContent = tabItems[item].title;
      if (this.activeTab === tabItems[item].id) {
        button.classList.add("active");
      }
      const li = document.createElement("li");
      li.className = "nav-item";
      li.role = "presentation";
      li.appendChild(button);
      tabFragment.appendChild(li);
    });
    this.tab.appendChild(tabFragment);
  }

  /**
   * @description Render all tasks to the UI.
   */
  // renderTodos() {
  //   const allTasks = this.stateService.getAllTask();
  //   Object.keys(allTasks).forEach((task) => this.addTodos(allTasks[task]));
  // }

  /**
   * @description Render tasks based on the active tab to the UI.
   */
  renderTodos() {
    this.tabContent.innerHTML = ""; // clear the previous content of the tab content
    const tasks = this.stateService.getAllTask(); // get all tasks by default

    if (this.activeTab === "active") {
      // get all active tasks
      const activeTasks = this.stateService.getPendingTask();
      Object.keys(activeTasks).forEach((task) =>
        this.addTodos(activeTasks[task])
      );
    } else if (this.activeTab === "completed") {
      // get all completed tasks
      const completedTasks = this.stateService.getCompletedTask();
      Object.keys(completedTasks).forEach((task) =>
        this.addTodos(completedTasks[task])
      );
    } else {
      // display all tasks by default
      Object.keys(tasks).forEach((task) => this.addTodos(tasks[task]));
    }
  }

  /**
   * @description Add a new task to the UI.
   * @param {Object} task - The task to be added.
   * @param {string} task.title - The title of the task.
   * @param {boolean} task.isCompleted - Whether the task is completed or not.
   * @param {number} task.id - The unique identifier of the task.
   */
  addTodos(task) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "border-0",
      "mb-2",
      "rounded"
    );
    li.style.background = "#f8f8f8";

    const div = document.createElement("div");
    div.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "w-100"
    );
    li.appendChild(div);

    const formCheck = document.createElement("div");
    formCheck.classList.add("form-check");
    div.appendChild(formCheck);

    const input = document.createElement("input");
    input.classList.add("form-check-input");
    input.type = "checkbox";
    input.name = "completeTask";
    input.id = `checkbox-${task.id}`;
    input.value = task.id;
    input.checked = task.isCompleted;
    input.disabled = task.isCompleted;
    formCheck.appendChild(input);

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.innerText = task.title;
    formCheck.appendChild(label);

    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-outline-danger",
      "btn-sm",
      "rounded",
      "ms-2"
    );
    button.name = "removeTask";
    button.id = task.id;
    button.innerText = "Remove";
    div.appendChild(button);

    this.tabContent.appendChild(li);
  }

  render() {
    this.renderTab(this.#tabItems);
    this.renderTodos();
  }
}
