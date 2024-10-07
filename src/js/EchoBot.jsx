import '../css/EchoBot.css';
import { useState, useEffect, useContext } from 'react';

import { Authenticate, LoginContext } from './Authenticate.jsx';
import { WithSocket, SocketContext } from './WithSocket.jsx';

const EchoBotCore = () => {
  const user = useContext(LoginContext);
  const username = user ? user.username : '';
  const socketRef = useContext(SocketContext);
  const socket = socketRef ? socketRef.current : null;
  // 表示用のログメッセージ
  const [logMessage, setLogMessage] = useState('');
  const handleTextMessage = (data) => {
    if (data.to === username && data.text) {
      const reply = `[${data.from}] ${data.text}`;
      // メッセージを送信する．
      socket.emit('text', {
        from: username,
        to: data.from,
        text: reply
      });
      setLogMessage(`reply: ${reply}`);
    }
  };

  useEffect(() => {
    if (socket) {
      console.log(`[EchoBot (${username})] adding listeners`);
      socket.on('text', handleTextMessage);
      return () => {
        console.log(`[EchoBot (${username})] removing listeners`);
        socket.off('text', handleTextMessage);
      }
    }
  }, []);
  return (
    <div>{logMessage}</div>
  );
}
export const EchoBot = (props) => {
  return (
    <div className="echo-bot">
      <Authenticate username={props.botname} password={props.password}>
        <WithSocket nsp={props.nsp}>
          <EchoBotCore />
        </WithSocket>
      </Authenticate>
    </div>
  );
};