/**
 * 第１１－１２週ミニ課題用のJSXファイル
 * テキストチャットを実装する．
 */
// React DOMの関数をimportする．
import { createRoot } from 'react-dom/client';

// デバッグ用にエラー発生時にエラーメッセージを表示するコンポーネントで囲む．
import { ErrorBoundary } from './ErrorBoundary';

// コンポーネントの定義をimportする．
import { Authenticate } from './Authenticate';
import { WithSocket } from './WithSocket';
/* ここから */
import { TextChat } from './TextChat';
/* ここまで */

// ReactコンポーネントをidがrootであるDOM要素に配置する．
const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    {/* 動作確認を容易にするため，チャットアプリを２つ横に並べて配置する．*/}
    <div className="cols-wrap two-cols">
      {/* ここから */}

      <Authenticate>
        <WithSocket nsp="/chat">
          <TextChat />
        </WithSocket>
      </Authenticate>
          
      <Authenticate>
        <WithSocket nsp="/chat">
          <TextChat />
        </WithSocket>
      </Authenticate>


      {/* ここまで */}
    </div>
  </ErrorBoundary >
);
