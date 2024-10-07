/**
 * テキストチャット
 */
// CSSを使用する場合：CSSの定義の読み込み
/* ここから */
import '../css/TextChat.css';
/* ここまで */
// reactから使用する関数をimportする．
/* ここから */
import { useState, useEffect, useContext, useRef } from 'react';
/* ここまで */

// 簡易ログイン機能を使用する．
import { LoginContext } from './Authenticate';
// Socket.IOのソケットを使用する．
import { SocketContext } from './WithSocket';

// TextChatコンポーネントの定義
export const TextChat = () => {
  // loginContextからユーザ情報を取得する．
  const user = useContext(LoginContext);
  const username = user ? user.username : '';
  // SocketContextからソケットを受け取る．
  const socketRef = useContext(SocketContext);
  const socket = socketRef ? socketRef.current : null;

  /* ここから */

  // 送信するテキストメッセージの入力
  const [inputMessage, setInputMessage] = useState('');
  // 受信したテキストメッセージのリスト
  const [messages, setMessages] = useState([]);


  // メッセージの最後までスクロールする．
  useEffect(() => {
    lastLineRef.current.scrollIntoView({ block: "nearest" });
  }, [messages]);


  // その他の変数（定数）を定義していく．
  // テキストメッセージの最後の行
  const lastLineRef = useRef(null);
  // chat の宛先
  const [chatTo, setChatTo] = useState('*');
  // サーバから送られてくるユーザのリスト
  const [userList, setUserList] = useState([]);


  // 受信したメッセージの処理
  const handleTextMessage = (data) => {
    // メッセージの最後に追加する．
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  // キー入力のたびにメッセージのテキストを入力するinput要素を更新する．
  const inputChanged = (event) => {
    setInputMessage(event.target.value);
  };

  // コンポーネントがマウントされた時にソケットにイベントリスナーをつける．
  useEffect(() => {
    if (socket) {
      console.log('[TextChat] adding listeners');
      // イベントリスナーを付加する．
      socket.on('text', handleTextMessage);
      socket.on('user-list', handleUserList);
      // 最新のユーザリストを求める．
      socket.emit('user-list', { from: username });

      return () => {
        console.log('[TextChat] removing listeners');
        // イベントリスナーを削除する．
        socket.off('text', handleTextMessage);
        socket.off('user-list', handleUserlist);

      };
    }
  }, []);

  // メッセージの最後までスクロールする．
  useEffect(() => {
    lastLineRef.current.scrollIntoView({ block: "nearest" });
  }, [messages]);

  //

  const handleUserList = (data) => {
    setUserList(data);
    // 現在の宛先（chatTo）がユーザリスト（data）に含まれていなければ宛先を'*'に設定する．
    if (data.indexOf(chatTo) < 0) {
      setChatTo('*');
    }
  };

  const selectChatTo = (event) => {
    setChatTo(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && inputMessage.length > 0) {
      sendTextMessage();
    }
  };

  const sendTextMessage = () => {
    if (socket) {
      socket.emit('text', {
        from: username,
        to: chatTo,
        text: inputMessage,
      });
      // 入力エリアをクリアする．
      setInputMessage('');
    }
  };

  /* ここまで */

  return (<div className="text-chat">
    { /* メッセージの履歴の表示 */}
    <div className="text-chat-message-list-container">
      <div className="text-chat-message-list">
        {// 自分が送ったか否かでCSSクラスを変える．
          messages.map((message) => (<div key={message.from + message.time}
            className={message.from === username ? "text-chat-from-me" : "text-chat-from-them"}>
            {message.from === username ? <div>{message.text}</div> : <div>{message.from} &gt; {message.text}</div>}
          </div>))}
        <div ref={lastLineRef}></div> </div>
    </div>
    {/* メッセージの入力 */} <div className="text-chat-input">
      <select onChange={selectChatTo} value={chatTo}> <option value="*">*</option> {userList.map((u) => (
        <option key={u} value={u}>{u}</option>))}
      </select> <input type="text" onChange={inputChanged
      }
        value={inputMessage} onKeyUp={handleKeyUp} />
      <button type="button" onClick={sendTextMessage
      }
        disabled={socket === null || inputMessage === ""}>送信</button> </div>
  </div>);
}
