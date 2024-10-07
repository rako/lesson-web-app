/*
 * ToDoリストのWeb API(/mock-todo)を呼び出すJavaScriptプログラム
 */
/* ここから */

//以下は3週目
const updateTaskList = async () => {
  const response = await fetch('/mock-todo');
  const data = await response.json();
  document.getElementById('task-list').innerText = JSON.stringify(data, null, 2);
};

//タスクの一覧を得る
document.getElementById('get-task-list').addEventListener('click', updateTaskList);

document.getElementById('add-task')
  .addEventListener('click', async () => {
    await fetch('/mock-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: document.getElementById('task-input').value,
        completed: false,
      })
    });
    // タスクの一覧を更新する．
    await updateTaskList();
  });

// タスクの一覧の削除
document.getElementById('delete-all-tasks').addEventListener('click', async () => {
  await fetch('/mock-todo', {
    method: 'DELETE'
  });
  await updateTaskList();
});



/* ここまで */
