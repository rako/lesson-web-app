/**
 * 第１回レポート課題用のJSXファイル
 */
// React DOMの関数をimportする．
import { createRoot } from 'react-dom/client';

// デバッグ用にエラー発生時にエラーメッセージを表示するコンポーネントで囲む．
import { ErrorBoundary } from './ErrorBoundary';

// ToDoListのコンポーネントの定義をimportする．
/* ここから */

import { ToDoList } from './ToDoList';

/* ここまで */

//Authenticateをimportする
import { Authenticate } from './Authenticate';

// ReactコンポーネントをidがrootであるDOM要素に配置する．
const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    {/* ここから */}
    <p>ログイン機能を使用した場合</p>
    <Authenticate usernameSaveKey="key1">
      <ToDoList url="/todo-secure" />
    </Authenticate>
    {/* ここまで */}
  </ErrorBoundary>
);
