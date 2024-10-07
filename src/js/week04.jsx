/**
 * 第４週ミニ課題用のJSXファイル
 */
// React DOMの関数をimportする．
import { createRoot } from 'react-dom/client';

// デバッグ用にエラー発生時にエラーメッセージを表示するコンポーネントで囲む．
import { ErrorBoundary } from './ErrorBoundary';

// コンポーネントの定義をimportする．
import { Hello } from './Hello';
/* ここから */
import { Greeting } from './Greeting';
import { Counter } from './Counter';
/* ここまで */

// ReactコンポーネントをidがrootのDOM要素に配置する．
const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Hello />
    {/* ここから */}
    <Greeting name="松本 遼" />
    <Counter initial={5} min={0} max={10} />
    {/* ここまで */}
  </ErrorBoundary>
);
