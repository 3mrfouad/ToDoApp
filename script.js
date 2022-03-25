// select the element
const newTask = document.querySelector('#new-task')
const addTaskBtn = document.querySelector('#add-btn')
const taskList = document.querySelector('#task-list')
let storedTaskList = []

const initializeApp = () => {
  storedTaskList = !localStorage.getItem('taskList')
    ? []
    : JSON.parse(localStorage.getItem('taskList'))

  if (storedTaskList.length !== 0) {
    storedTaskList.forEach(task => {
      handleAddTask(null, task)
    })
  }
}

const addTaskToStorage = task => {
  storedTaskList.push(task)
  localStorage.setItem('taskList', JSON.stringify(storedTaskList))
}

const removeTaskFromStorage = task => {
  if (storedTaskList.length === 0) return
  const taskIndex = storedTaskList.findIndex(element => element === task)
  if (taskIndex !== -1) storedTaskList.splice(taskIndex, 1)

  localStorage.setItem('taskList', JSON.stringify(storedTaskList))
}

const handleAddTask = (e, task) => {
  // create new elements
  const newTaskLi = document.createElement('li')
  const newTaskSpan = document.createElement('span')
  const newTaskDeleteBtn = document.createElement('button')

  // use appendChild to build the hierarchy
  taskList.appendChild(newTaskLi)
  newTaskLi.appendChild(newTaskSpan)
  newTaskLi.appendChild(newTaskDeleteBtn)

  // add classes to the newly created elements
  newTaskLi.classList.add('task-container', 'list-group-item')
  newTaskDeleteBtn.classList.add('btn', 'btn-danger')

  // add content to the newly created element
  newTaskDeleteBtn.textContent = 'x'
  newTaskSpan.textContent = task ? task : newTask.value

  // add event listeners
  const _deleteTask = () => {
    // newTaskDeleteBtn.removeEventListener('click', _deleteTask)
    newTaskLi.remove()
    removeTaskFromStorage(newTaskSpan.textContent)
  }
  newTaskDeleteBtn.addEventListener('click', _deleteTask)

  if (!task) addTaskToStorage(newTask.value)
}

// [x] Add event to the add button
addTaskBtn.addEventListener('click', handleAddTask, false)
newTask.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleAddTask()
  }
})

window.addEventListener('load', initializeApp)

console.log(document.querySelector('#myForm'))
