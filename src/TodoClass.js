import { parseISO, formatDistanceToNow } from "date-fns";
import { createElement, getElement } from "./domMan";
export let currProjId = JSON.parse(localStorage.getItem("currProjId")) || 0;

const container = getElement(".card-container");
const projectList = getElement(".project-list");
let idBox = undefined;

class Projects {
  
  static projects = JSON.parse(localStorage.getItem("projects")) || [{ name: "Default project", tasks: [] }];

  static displayProjects() {
    while (projectList.childElementCount > 0) {
      projectList.removeChild(projectList.lastChild);
    }
    this.projects.forEach((element, idx) => {
      const prElem = createElement("div", "project-element");
      const prName = createElement("div", "project-name");
      const h2 = createElement("h2", undefined, `${element.name}`);
      projectList.appendChild(prElem);
      prElem.appendChild(prName);
      prName.appendChild(h2);
      prName.addEventListener("click", () => {
        getElement(".current-project.title-separator").textContent =
          h2.textContent;
        currProjId = idx;
        localStorage.setItem("currProjId", JSON.stringify(currProjId));
        Todo.displayTodos();
        this.displayProjects();
      });
    });
  }
}
function infoDisplay(id) {
  idBox = id;
  getElement(".bg-container-info").style.display = "flex";
  getElement("#title-info").value = Projects.projects[currProjId].tasks[id].title;
  getElement("#description-info").value = Projects.projects[currProjId].tasks[id].description;
  getElement("#priority-info").value = Projects.projects[currProjId].tasks[id].priority;
  getElement("#notes-info").value = Projects.projects[currProjId].tasks[id].notes;
  getElement("#duedate-info").value = Projects.projects[currProjId].tasks[id].dueDate;
  document
    .getElementsByTagName("span")[1]
    .addEventListener(
      "click",
      () => (getElement(".bg-container-info").style.display = "none")
    );
}

class Todo {
  constructor(title, description, dueDate, priority, notes, completed = false) {
    this.title = title || "None";
    this.description = description || "None";
    this.dueDate = dueDate || "not set";
    this.priority = priority;
    this.notes = notes;
    this.completed = completed;
  }

  addTodoToLibrary() {
    Projects.projects[currProjId].tasks;
    Projects.projects[currProjId].tasks.push(this);
    Todo.saveToStorage();
    Todo.addTodo();
  }

  static saveToStorage() {
    localStorage.setItem("projects", JSON.stringify(Projects.projects));
  }

  static updateTodo() {
    let id = idBox;
    Projects.projects[currProjId].tasks[id].title = getElement("#title-info").value;
    Projects.projects[currProjId].tasks[id].description = getElement(
      "#description-info"
    ).value;
    Projects.projects[currProjId].tasks[id].priority = getElement(
      "#priority-info"
    ).value;
    Projects.projects[currProjId].tasks[id].notes = getElement("#notes-info").value;
    Projects.projects[currProjId].tasks[id].dueDate =
      getElement("#duedate-info").value || "not set";
    this.saveToStorage();
  }

  static isCompleted(el) {
    Projects.projects[currProjId].tasks[el.target.id].completed = !Projects.projects[currProjId]
      .tasks[el.target.id].completed;
    el.target.previousElementSibling.textContent = `${
      el.target.checked ? "Completed" : "To do"
    }`;
    getElement(`[data-todo="${el.target.id}"]`).classList.toggle("task-completed");
    this.saveToStorage();
  }

  static displayTodos() {
    while (container.childElementCount > 3) {
      container.removeChild(container.lastChild);
    }
    Projects.projects[currProjId].tasks.forEach(this.addTodo);
  }

  static addTodo(lastItem, index) {
    if (lastItem == null) {
      lastItem =
        Projects.projects[currProjId].tasks[Projects.projects[currProjId].tasks.length - 1];
      index = Projects.projects[currProjId].tasks.length - 1;
    }

    const div = createElement("div", "todo-box");
    const h2 = createElement("h2");
    const p1 = createElement("p");
    const p2 = createElement("p");
    const pPriority = createElement("p");
    const p3 = createElement("p");
    const newCheckBox = createElement("input");
    const removeBtn = createElement("button");
    const infoBtn = createElement("button");
    div.setAttribute("data-todo", `${index}`);
    container.appendChild(div);

    h2.textContent = `${lastItem.title}, [${index}]`;
    div.appendChild(h2);

    p1.textContent = `Description: ${lastItem.description}`;
    div.appendChild(p1);

    p2.textContent = `Due date: ${
      lastItem.dueDate !== "not set"
        ? formatDistanceToNow(parseISO(lastItem.dueDate), { addSuffix: true })
        : lastItem.dueDate
    }`;
    div.appendChild(p2);

    pPriority.textContent = (div.classList.toggle(lastItem.priority), `Priority: ${lastItem.priority}`);  // Color border accroding to priority
    div.appendChild(pPriority);

    p3.textContent = lastItem.completed ? (div.classList.toggle("task-completed"), "Completed" )  : "Still to do";
    
    div.appendChild(p3);
    newCheckBox.type = "checkbox";
    newCheckBox.checked = lastItem.completed;
    newCheckBox.setAttribute("id", `${index}`);
    div.appendChild(newCheckBox);

    removeBtn.textContent = "Remove";
    removeBtn.classList.add(`remove-btn`);
    removeBtn.setAttribute("id", `${index}`);
    div.appendChild(removeBtn);

    infoBtn.textContent = "I";
    infoBtn.classList.add(`info-btn`);
    infoBtn.setAttribute("id", `${index}`);
    infoBtn.addEventListener("click", () => {
      infoDisplay(index);
    });
    div.appendChild(infoBtn);
  }
}
getElement(".current-project.title-separator").textContent = Projects.projects[currProjId].name

export { Todo, Projects };
