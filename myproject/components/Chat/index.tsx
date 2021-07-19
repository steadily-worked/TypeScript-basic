import React, { VFC } from 'react';
import { IDM } from '@typings/db';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
interface Props {
  data: IDM;
}

const Chat: VFC<Props> = ({ data }) => {
  const user = data.Sender; // 데이터를 보낸 사람이 sender
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;

// date-fns, luxon 데이트 라이브러리
