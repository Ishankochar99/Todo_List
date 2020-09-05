const TodoList = (function () {
  let tasks = [];
  const tasksList = document.getElementById('list');
  const addTaskInput = document.getElementById('add');
  const tasksCounter = document.getElementById('tasks-counter');

  function addTodo (task) {
    if (task) {
      tasks.push(task);
      renderList();
      return;
    }
  }

  function addDOM (task) {
    const li = document.createElement('li');

    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
                    <label for="${task.id}">${task.text}</label>
                    <img src="img/bin.svg" class="delete" data-id="${task.id}"/>
                    `;
    tasksList.appendChild(li);
  }

  function renderList () {
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
      addDOM(tasks[i]);
    }

    // set tasks count
    tasksCounter.innerHTML = tasks.length;
  }

  function check (taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      renderList();
      return;
    }
  }

  function deleteTodo (taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);

    tasks = newTasks;
    renderList();
  }
  function handleClickLisetner (e) {
    
    if (e.target.className === 'delete') {
      const taskId = e.target.dataset.id;
      deleteTodo(taskId);

      return;
    } else if (e.target.className === 'custom-checkbox') {
      const taskId = e.target.id;
      check(taskId);

      return;
    }
  }

  function handleInputKeypress (e) {
    if (event.key === 'Enter') {
      const text = e.target.value;

      if (!text) {
        return;
      }

      const task = {
        text,
        id: Date.now().toString(),
        done: false
      }
      e.target.value = '';
      addTodo(task);
    }
  }

  function initializeTodoList () {
    document.addEventListener('click', handleClickLisetner);
    addTaskInput.addEventListener('keyup', handleInputKeypress);
  }

  return {
    init: initializeTodoList
  }
})();