import {
  createTodos,
  createProjects,
  infoBoxUpdate,
  removeElements,
  currProjId,
  changeCompleteText
} from './createElements'
import { getElement } from './domMan'

const container = getElement('.card-container')
const projectList = getElement('.project-list')

class Projects {
  static projects = JSON.parse(localStorage.getItem('projects')) || [
    { name: 'Default project', tasks: [] }
  ]

  static displayProjects() {
    removeElements(projectList, 0)
    this.projects.forEach((element, idx) => {
      createProjects(element, idx)
    })
  }
}
class Todo {
  constructor(title, description, dueDate, priority, notes, completed = false) {
    this.title = title || 'None'
    this.description = description || 'None'
    this.dueDate = dueDate || 'not set'
    this.priority = priority
    this.notes = notes
    this.completed = completed
  }

  addTodoToLibrary() {
    Projects.projects[currProjId].tasks.push(this)
    Todo.saveToStorage()
    Todo.addTodo()
  }

  static saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(Projects.projects))
  }

  static updateTodo() {
    infoBoxUpdate(Projects.projects[currProjId])
    this.saveToStorage()
  }

  static isCompleted(el) {
    Projects.projects[currProjId].tasks[el.target.id].completed = !Projects.projects[currProjId]
      .tasks[el.target.id].completed
    changeCompleteText(el)
    this.saveToStorage()
  }

  static displayTodos() {
    removeElements(container, 3)
    Projects.projects[currProjId].tasks.forEach(this.addTodo)
  }

  static addTodo(lastItem, index) {
    if (lastItem == null) {
      lastItem = Projects.projects[currProjId].tasks[Projects.projects[currProjId].tasks.length - 1]
      index = Projects.projects[currProjId].tasks.length - 1
    }
    createTodos(lastItem, index, Projects.projects[currProjId].tasks[index])
  }
}

export { Todo, Projects }
