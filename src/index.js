import { compareAsc, format, parse, parseISO,formatDistanceToNow } from 'date-fns'
import { createElement, getElement } from "./domMan";



let idBox = undefined;
let currProjId = JSON.parse(localStorage.getItem('currProjId')) || 0;
let projects = JSON.parse(localStorage.getItem('projects')) || [{name: "Default project", tasks : []}];
const projectList = getElement(".project-list");

const container = document.querySelector(".card-container");
getElement(".current-project.title-separator").textContent = projects[currProjId].name
const newProjBtn = getElement("#new-prj-btn")
newProjBtn.addEventListener("click", () => {
  getElement(".modal-wrapper").classList.toggle("display-none");
  getElement("#new-project-name").value= "";
});


const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => document.querySelector(".bg-container").style.display = "none");

const btnCreatePrj = getElement(".button.create")
btnCreatePrj.addEventListener("click", () => {
  if(getElement("#new-project-name").value==="") { 
    alert("Please enter the name"); 
} else { 
    getElement("#new-project-name").disabled = false
    projects.push({name : getElement("#new-project-name").value, tasks : []})
    getElement(".modal-wrapper").classList.toggle("display-none");
    displayProjects()
    Todo.saveToStorage()
}
  ;
})


const btnCancelPrj = getElement(".button.cancel")
btnCancelPrj.addEventListener("click", () => {
    getElement(".modal-wrapper").classList.toggle("display-none");
 
})

const btnTodo = document.querySelector(".add-todo");
btnTodo.addEventListener("click", () => {
  document.querySelector(".bg-container").style.display = "flex";
});

const btnAdd = document.querySelector("#addtodo");
btnAdd.addEventListener("click", () => {
  document.querySelector(".bg-container").style.display = "none";
  new Todo(form.title.value, form.description.value, form.duedate.value, form.priority.value, form.notes.value).addTodoToLibrary()
  //addTodoToLibrary(new Todo());
  form.reset();
});

const btnEdit = document.querySelector("#addtodo-info");
btnEdit.addEventListener("click", () => {
  
  if (btnEdit.value === "Edit") {
    document.querySelector("fieldset").disabled = false;
    console.log(btnEdit.value)
    btnEdit.value = "Save & Close"
  }
  else if (btnEdit.value === "Save & Close") {
    
    btnEdit.value = "Edit"
    document.querySelector(".bg-container-info").style.display = "none"
    Todo.updateTodo(idBox);
    Todo.displayTodos();
    document.querySelector("fieldset").disabled = true;
  }    }, );


class Todo {
  constructor(title, description, dueDate, priority, notes, completed = false) {
    this.title = title  || "None";
    this.description = description || "None";
    this.dueDate = dueDate  || "not set";
    this.priority = priority ;
    this.notes = notes;
    this.completed = completed;
}

  addTodoToLibrary () {
    projects[currProjId].tasks
    projects[currProjId].tasks.push(this);
    Todo.saveToStorage();
    Todo.addTodo();
  }

  static saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static updateTodo(id) {
    projects[currProjId].tasks[id].title = getElement("#title-info").value
    projects[currProjId].tasks[id].description = getElement("#description-info").value
    projects[currProjId].tasks[id].priority = getElement("#priority-info").value
    projects[currProjId].tasks[id].notes = getElement("#notes-info").value
    projects[currProjId].tasks[id].dueDate = getElement("#duedate-info").value
    this.saveToStorage();
  }

  static isCompleted(el) {
    projects[currProjId].tasks[el.target.id].completed = !projects[currProjId].tasks[el.target.id].completed;
    el.target.previousElementSibling.textContent = `${el.target.checked ? "Completed" : "To do"}`
    this.saveToStorage();
  }

  static displayTodos() {
    while (container.childElementCount > 3) {
    container.removeChild(container.lastChild)
  }
  projects[currProjId].tasks.forEach(this.addTodo);
}

static addTodo(lastItem, index) {
  if (lastItem == null) {
    lastItem = projects[currProjId].tasks[projects[currProjId].tasks.length - 1]
    index = projects[currProjId].tasks.length - 1
  }

  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p22 = document.createElement("p");
  const p3 = document.createElement("p");
  const newCheckBox = document.createElement("input");
  const removeBtn = document.createElement("button");
  const infoBtn = document.createElement("button");

    div.classList.add(`todo-box`);
    div.setAttribute("data-todo", `${index}`);
    container.appendChild(div);

    h2.textContent = `${lastItem.title}, [${index}]`;
    div.appendChild(h2);

    p1.textContent = `Description: ${lastItem.description}`;
    div.appendChild(p1);

    p2.textContent = `Due date: ${lastItem.dueDate !== "not set" ? formatDistanceToNow(parseISO(lastItem.dueDate), {addSuffix: true} ) : lastItem.dueDate}`;
    div.appendChild(p2);
   
    p22.textContent = `Priority: ${lastItem.priority}`;
    div.appendChild(p22);
    
    p3.textContent = lastItem.completed ? "Completed" : "Still to do";
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
      infoDisplay (index)
    })
    div.appendChild(infoBtn);
  }
  


}

function displayProjects () {
  
  while (projectList.childElementCount > 0) {
    projectList.removeChild(projectList.lastChild)
  }
  projects.forEach((element, idx) => {
    const prElem = createElement("div", "project-element")
    const prName = createElement("div", "project-name")
    const h2 = createElement("h2", undefined, `${element.name}`)
    projectList.appendChild(prElem)
    prElem.appendChild(prName)
    prName.appendChild(h2)
    prName.addEventListener("click", () => {
      getElement(".current-project.title-separator").textContent = h2.textContent
      currProjId = idx;
      localStorage.setItem('currProjId', JSON.stringify(currProjId))
      console.log(currProjId)
      Todo.displayTodos();
      displayProjects()
    })
    
  })
}

document.body.addEventListener( 'click', e => {
  if (e.target.className === 'remove-btn') {
    projects[currProjId].tasks.splice(e.target.id, 1);
    Todo.saveToStorage();
    let el = document.querySelector(`[data-todo="${e.target.id}"]`);
    el.remove();
    Todo.displayTodos();
  }
  if (e.target.type === "checkbox") {
      Todo.isCompleted(e);
  }

} );

function infoDisplay (id) {
  idBox = id;
  document.querySelector(".bg-container-info").style.display = "flex"
  getElement("#title-info").value = projects[currProjId].tasks[id].title
  getElement("#description-info").value = projects[currProjId].tasks[id].description
  getElement("#priority-info").value = projects[currProjId].tasks[id].priority
  getElement("#notes-info").value = projects[currProjId].tasks[id].notes
  getElement("#duedate-info").value = projects[currProjId].tasks[id].dueDate
  document.getElementsByTagName('span')[1].addEventListener('click', () => document.querySelector(".bg-container-info").style.display = "none");

  


  





  // let div = createElement("div", "bg-modal");
  // // let divp = createElement("div", "divp");
  // let container1 = createElement("div", "bg-container")
  // container1.style.display = "flex";
  
  // let form = createElement("form", undefined, undefined, `form`);
  // //<label for="priority">Set a priority:</label>
  
  // const label = createElement("label")
  // label.htmlFor = "title"
  // label.textContent = "Title: "

  // const input = createElement("input", undefined, undefined, "addtodo")
  // input.value = "Edit"
  // console.dir(input)
  // let fieldset = createElement("fieldset");
  // fieldset.disabled = true

  // let close = createElement("span", "close");
  // close.textContent = "X"
  // const input1 = createElement("input", undefined, undefined, `title`)
  // input1.setAttribute("type","text");
  // input1.value = projects[currProjId].tasks[id].title

  // const input2 = createElement("input", undefined, undefined, `description`)
  // input2.setAttribute("type","text");
  // input2.value = projects[currProjId].tasks[id].description
  // const br = createElement("br")

  // const p2 = document.createElement("p");
  // p2.textContent = `Due date: ${projects[currProjId].tasks[id].dueDate}`;

  // const pPriority = document.createElement("p");
  // pPriority.textContent = `Priority: ${projects[currProjId].tasks[id].priority}`;

  // const notesArea = createElement("textarea");
  // notesArea.textContent = projects[currProjId].tasks[id].notes;
  // container.appendChild(container1)
  // container1.appendChild(div);
  // div.appendChild(form)
  // form.appendChild(fieldset)
  // fieldset.appendChild(close)
  // fieldset.appendChild(label)
  // fieldset.appendChild(input1)
  // fieldset.appendChild(input2)
  // fieldset.appendChild(p2)
  // fieldset.appendChild(pPriority)
  // fieldset.appendChild(notesArea)
  // fieldset.appendChild(br)
  // fieldset.appendChild(input)

  


}
console.log(projects)
Todo.displayTodos();
displayProjects()
console.log(currProjId)