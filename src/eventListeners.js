
import {getElement } from "./domMan";
import {Todo, Projects, currProjId} from "./TodoClass"



const newProjBtn = getElement("#new-prj-btn")
const closePopUp = document.getElementsByTagName('span')[0];
const btnCreatePrj = getElement(".button.create")
const btnCancelPrj = getElement(".button.cancel")
const btnTodo = getElement(".add-todo");
const btnAdd = getElement("#addtodo");
const btnEdit = getElement("#addtodo-info");
function initEvents () {
newProjBtn.addEventListener("click", () => {
  getElement(".modal-wrapper").classList.toggle("display-none");
  getElement("#new-project-name").value= "";
});

closePopUp.addEventListener('click', () => getElement(".bg-container").style.display = "none");

btnCreatePrj.addEventListener("click", () => {
  if(getElement("#new-project-name").value==="") { 
    alert("Please enter the name"); 
} else { 
    getElement("#new-project-name").disabled = false
    Projects.projects.push({name : getElement("#new-project-name").value, tasks : []})
    console.log(Projects.projects)
    getElement(".modal-wrapper").classList.toggle("display-none");
    Projects.displayProjects()
    Todo.saveToStorage()
}})

btnCancelPrj.addEventListener("click", () => {
    getElement(".modal-wrapper").classList.toggle("display-none");
 
})

btnTodo.addEventListener("click", () => {
  getElement(".bg-container").style.display = "flex";
});

btnAdd.addEventListener("click", () => {
  getElement(".bg-container").style.display = "none";
  new Todo(form.title.value, form.description.value, form.duedate.value, form.priority.value, form.notes.value).addTodoToLibrary()
  //addTodoToLibrary(new Todo());
  form.reset();
});

btnEdit.addEventListener("click", () => {
  
  if (btnEdit.value === "Edit") {
    getElement("fieldset").disabled = false;
   
    btnEdit.value = "Save & Close"
  }
  else if (btnEdit.value === "Save & Close") {
    
    btnEdit.value = "Edit"
    getElement(".bg-container-info").style.display = "none"
    Todo.updateTodo();
    Todo.displayTodos();
    getElement("fieldset").disabled = true;
  }    }, );
  
  document.body.addEventListener( 'click', e => {
    if (e.target.className === 'remove-btn') {
      Projects.projects[currProjId].tasks.splice(e.target.id, 1);
      Todo.saveToStorage();
      let el = getElement(`[data-todo="${e.target.id}"]`);
      el.remove();
      Todo.displayTodos();
    }
    if (e.target.type === "checkbox") {
        Todo.isCompleted(e);
    }
  
  } );}

  export {initEvents}