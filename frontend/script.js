const API_URL = 'https://your-render-url.onrender.com/api/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.onclick = () => deleteTask(task._id);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value;
  if (!text) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

fetchTasks();

