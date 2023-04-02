import Task from "./task";
import Layout from "./layout";

/*
 * Initializes the todo application by creating an instance of the Task class and the Layout class,
 * and passing the Task instance to the Layout constructor.
 */
const loadApp = () => {
  const stateService = new Task();
  const wrapper = document.querySelector("#card-wrapper");
  new Layout(stateService, wrapper);
};

loadApp();
