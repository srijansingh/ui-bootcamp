import Task from "./task";
import Layout from "./layout";

const loadApp = () => {
  const stateService = new Task();
  const wrapper = document.querySelector("#card-wrapper");
  new Layout(stateService, wrapper);
};

loadApp();
