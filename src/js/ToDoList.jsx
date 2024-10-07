/**
 * ToDoリストのユーザインタフェース
 */
// CSS定義を使用する場合
/* ここから */
import '../css/TextChat.css';
/* ここまで */
// reactの関数をimportする．
/* ここから */

import { useState, useEffect, useContext, useRef } from 'react';

/* ここまで */

// ログイン機能を使用する場合
/* ここから */


import { LoginContext } from './Authenticate';


/* ここまで */

//React-Draggableのimport
//import Draggable from 'react-draggable';


//日付を表す文字列を求める
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const todayStr = `${year.toString()}-${month.toString().padStart(2, '0')}-
${day.toString().padStart(2, '0')}`;

// コンポーネントの定義
export const ToDoList = (props) => {
  /* ここから */
  // state変数の定義

  // タスクのリスト
  const [taskList, setTaskList] = useState([]);

  //エラーメッセージ用変数
  const [errorMessage, setErrorMessage] = useState('');

  //ログインコンテキスト
  const user = useContext(LoginContext);
  const authHeader = user ? { 'Authorization': 'Bearer ' + user.token } : {};

  //締め切り過ぎているかどうか
  const isTaskOverdue = (task) => (
    !task['completed'] && task['deadline'] && (task['deadline'] < todayStr)
  );

  // タスクリストをサーバから取得する
  const getTaskList = async () => {
    try {
      setErrorMessage('');
      // GETリクエストを送る．
      const response = await fetch(props.url, {
        method: 'GET',
        headers: authHeader
      });
      if (!response.ok) {
        // statusが200番台以外の時はエラーとして扱う．
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // JSONレスポンスを取得する．
      const data = await response.json();
      setTaskList(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // タスクを追加する
  const [taskInput, setTaskInput] = useState('');

  const addTask = async () => {
    const deadline = deadlineInputRef.current.value;
    try {
      setErrorMessage('');
      // POSTリクエストを送る．
      const response = await fetch(props.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: JSON.stringify({
          description: taskInput,
          completed: false,
          // ログイン時にはタスクのプロパティにユーザ名を追加することにしている．
          ...(user ? { username: user.username } : {}),
          ...(deadline ? { deadline } : {})
        })
      });
      if (!response.ok) {
        // statusが200番台以外の時はエラーとして扱う．
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // 入力エリアをクリアする．
      setTaskInput('');
      //タスク追加後、締め切りの入力をクリアする
      deadlineInputRef.current.value = '';
      // タスクリストを更新する．
      getTaskList();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  //
  const handleTaskInput = (event) => {
    setTaskInput(event.target.value);
  };

  //タスクの削除
  const deleteTask = async (task) => {
    try {
      setErrorMessage('');
      // DELETEリクエストを送る．
      const response = await fetch(props.url + '/' + task._id, {
        method: 'DELETE',
        headers: authHeader
      });
      if (!response.ok) {
        // statusが200番台以外の時はエラーとして扱う．
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // タスクリストを更新する．
      getTaskList();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const updateTask = async (task, delta) => {
    // オブジェクトリテラルのスプレッド構文を使用
    const updatedTask = { ...task, ...delta };
    try {
      setErrorMessage('');
      // PUTリクエストを送る．
      const response = await fetch(props.url + '/' + task._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) {
        // statusが200番台以外の時はエラーとして扱う．
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // タスクリストを更新する．
      getTaskList();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  /* ここまで */

  // コンポーネントを最初に描画する時にタスクリストを更新する
  useEffect(() => {
    getTaskList();
  }, []);

  //ref変数を宣言する
  const deadlineInputRef = useRef(null);

  //完了済みのタスクを表示するか否かをstate変数として定義する
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTaskList = taskList.filter((task) => (
    showCompleted || !task['completed']
  ));

  //Enterキーのイベント
  {/*const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    console.log('Click')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    handleSubmit(e)
  }
*/}


  //Enterキーで入力をするためのイベントを作っておく
  const [isComposing, setIsComposing] = useState(false);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !isComposing) {
      // 入力を確定したときの処理（送信・表示・入力フォームのクリアなど）
      handleSubmit();
    }
  }



  return (
    /* ここから */

    <div className="todo-list">
      <div className="todo-list-head">
        <span onClick={getTaskList}>
          ToDoリスト [{props.url}] </span>
        <label>
          <input type="checkbox" checked={showCompleted}
            onChange={(e) => { setShowCompleted(e.target.checked) }} />
          完了済のタスクも表示
        </label>
      </div>
      {filteredTaskList.length === 0 ? null :
        <div className="todo-list-task-list">
          {filteredTaskList.map((task) => (
            //<Draggable>
            <div key={task['_id']} className={"todo-list-task" +
              (task['completed'] ? " todo-list-completed" : "") +
              (isTaskOverdue(task) ? " todo-list-overdue" : "")
            }>
              {/* タスクの完了 */}
              <input type="checkbox" checked={task['completed']}
                onChange={(e) => updateTask(task, {
                  completed: e.target.checked
                })} />
              {/* タスク記述 */}
              <span className="todo-list-description">{task['description']}</span>
              {/* 締切の表示 */}
              <input className="todo-list-deadline"
                type="date" value={task['deadline']}
                onChange={(e) => updateTask(task, {
                  deadline: e.target.value
                })} />
              {/* ユーザ名 */}
              <span className="todo-list-username">【{task['username']}】</span>
              {/* 削除 */}
              <button type="button" onClick={() => deleteTask(task)}>削除</button>
            </div>
            // </Draggable>
          ))}
        </div>
      }
      {/* 新規タスクの追加 */}
      <div className="todo-list-task-input">
        <input type="text" onChange={handleTaskInput}
          placeholder="タスク" value={taskInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <input type="date" ref={deadlineInputRef} defaultValue="" />
        <button type="button" onClick={addTask}>追加</button>
      </div>
      {/* エラーメッセージの表示 */}
      {
        errorMessage === '' ? null :
          <div className="error-message"
            onClick={() => setErrorMessage('')}>
            {errorMessage}
          </div>
      }
    </div>



    /* ここまで */
  );
};
