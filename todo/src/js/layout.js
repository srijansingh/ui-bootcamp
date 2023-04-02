export default class Layout {
  constructor(stateService, wrapper) {
    this.stateService = stateService;
    this.wrapper = wrapper;
    this.tabItems = {
      all: { id: "all", title: "All" },
      active: { id: "active", title: "Active Task" },
      completed: { id: "completed", title: "Completed" },
    };
    this.activeTab = "all";
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    // Form Submit event
    const form = this.wrapper.querySelector("form");
    form.addEventListener("submit", (e) => {
      this.submitTask(e);
    });

    // Tab click event
    const tab = this.wrapper.querySelector("#tab");
    tab.addEventListener("click", (e) => {
      const newTab = e.target.id;
      this.wrapper
        .querySelector(`#${this.activeTab}`)
        .classList.remove("active");
      this.wrapper.querySelector(`#${newTab}`).classList.add("active");
      this.activeTab = newTab;
    });

    // Remove click
    let tabContent = this.wrapper.querySelector("#tab-content");
    tabContent.addEventListener("click", (e) => {
      const id = e.target?.id;
      if (!id) return;

      const allTask = this.stateService.getAllTask();
      const elem = document.getElementById(id);
      console.log({ elem });
      if (elem.dataset.action === "complete" && allTask.hasOwnProperty(id)) {
        this.stateService.completeTask(id);
      } else if (
        elem.dataset.action === "remove" &&
        allTask.hasOwnProperty(id)
      ) {
        this.stateService.deleteTask(id);
        elem.parentElement.parentElement.remove();
      }
    });
  }

  submitTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('input[name="task"]');
    if (taskInput.value) {
      const task = this.stateService.createTask(taskInput.value);
      taskInput.value = "";
      taskInput.focus();
      this.addTodos(task);
    }
  }

  renderTab(tabItems) {
    let tab = this.wrapper.querySelector("#tab");
    Object.keys(tabItems).forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      li.role = "presentation";
      const element = `<button
        class="nav-link ${this.activeTab === tabItems[item].id ? "active" : ""}"
        id=${tabItems[item].id}
        role="tab"
      >
        ${tabItems[item].title}
      </button>`;
      li.innerHTML = element;
      tab.appendChild(li);
    });
  }

  renderTodos() {
    const allTasks = this.stateService.getAllTask();
    Object.keys(allTasks).forEach((task) => this.addTodos(allTasks[task]));
  }

  addTodos(task) {
    let tabContent = this.wrapper.querySelector("#tab-content");
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex align-items-center border-0 mb-2 rounded";
    li.style.background = "#f4f6f7";
    const el = `
    <div class="d-flex justify-content-between  align-items-center" style="width:100%">
    <div class="d-flex p-2"
      <p>${task.title}</p>
    </div>
    <div class="gap-2"> 
    <button data-action="remove" id="${task.id}" class="btn btn-sm btn-outline-danger rounded">Remove</button>
      <button data-action="complete" id="${task.id}" class="btn btn-sm btn-outline-primary rounded">Complete</button>
    </div>
  </div>
    `;
    li.innerHTML = el;
    tabContent.appendChild(li);
  }

  render() {
    this.renderTab(this.tabItems);
    this.renderTodos();
  }
}
