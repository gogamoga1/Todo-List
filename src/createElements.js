import { createElement, getElement } from './domMan'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Todo, Projects } from './TodoClass'

const container = getElement('.card-container')
const projectList = getElement('.project-list')
let idBox
export let currProjId = JSON.parse(localStorage.getItem('currProjId')) || 0

function infoDisplay (obj, id) {
  idBox = id
  getElement('.bg-container-info').style.display = 'flex'
  getElement('#title-info').value = obj.title
  getElement('#description-info').value = obj.description
  getElement('#priority-info').value = obj.priority
  getElement('#notes-info').value = obj.notes
  getElement('#duedate-info').value = obj.dueDate
  document
    .getElementsByTagName('span')[1]
    .addEventListener('click', () => (getElement('.bg-container-info').style.display = 'none'))
}

export function infoBoxUpdate (obj) {
  const id = idBox
  obj.tasks[id].title = getElement('#title-info').value
  obj.tasks[id].description = getElement('#description-info').value
  obj.tasks[id].priority = getElement('#priority-info').value
  obj.tasks[id].notes = getElement('#notes-info').value
  obj.tasks[id].dueDate = getElement('#duedate-info').value || 'not set'
}

export function removeElements (node, num) {
  while (node.childElementCount > num) {
    node.removeChild(node.lastChild)
  }
}

export function createTodos (lastItem, index, obj) {
  const div = createElement('div', 'todo-box')
  div.setAttribute('data-todo', `${index}`)
  container.appendChild(div)

  const h2 = createElement('h2')
  const p1 = createElement('p')
  const p2 = createElement('p')
  const pPriority = createElement('p')
  const p3 = createElement('p')
  const newCheckBox = createElement('input')
  const removeBtn = createElement('button')
  const infoBtn = createElement('button')

  h2.textContent = `${lastItem.title}, [${index}]`
  p1.textContent = `Description: ${lastItem.description}`
  p2.textContent = `Due date: ${
    lastItem.dueDate !== 'not set'
      ? formatDistanceToNow(parseISO(lastItem.dueDate), { addSuffix: true })
      : lastItem.dueDate
  }`
  pPriority.textContent =
    (div.classList.toggle(lastItem.priority), `Priority: ${lastItem.priority}`) // Color border according to priority
  p3.textContent = lastItem.completed
    ? (div.classList.toggle('task-completed'), 'Completed')
    : 'Still to do'

  newCheckBox.type = 'checkbox'
  newCheckBox.checked = lastItem.completed
  newCheckBox.setAttribute('id', `${index}`)

  removeBtn.textContent = 'Remove'
  removeBtn.classList.add('remove-btn')
  removeBtn.setAttribute('id', `${index}`)

  infoBtn.textContent = 'I'
  infoBtn.classList.add('info-btn')
  infoBtn.setAttribute('id', `${index}`)
  infoBtn.addEventListener('click', () => {
    infoDisplay(obj, index)
  })
  div.append(h2, p1, p2, pPriority, p3, newCheckBox, removeBtn, infoBtn)
}

export function createProjects (element, idx) {
  const prElem = createElement('div', 'project-element')
  const prName = createElement('div', 'project-name')
  const h2 = createElement('h2', undefined, `${element.name}`)
  projectList.appendChild(prElem)
  prElem.appendChild(prName)
  prName.appendChild(h2)
  prName.addEventListener('click', () => {
    getElement('.current-project.title-separator').textContent = h2.textContent
    currProjId = idx
    localStorage.setItem('currProjId', JSON.stringify(currProjId))
    Todo.displayTodos()
    Projects.displayProjects()
  })
}

export function changeCompleteText (el) {
  el.target.previousElementSibling.textContent = `${el.target.checked ? 'Completed' : 'To do'}`
  getElement(`[data-todo="${el.target.id}"]`).classList.toggle('task-completed')
}
