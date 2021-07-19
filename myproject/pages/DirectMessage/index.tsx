import React, { useCallback, useRef, useEffect } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import gravatar from 'gravatar';
import useSWR, { useSWRInfinite } from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import ChatList from '@components/ChatList';
import axios from 'axios';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';
import useSocket from '@hooks/useSocket';

const DirectMessage = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR('/api/users}', fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize, // page 수를 바꿔주는 역할을 함
  } = useSWRInfinite<IDM[]>(
    (index) => `api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`, // 다음 페이지로 넘어가는것
    fetcher,
  );

  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0; // 무한스크롤시 데이터가 비어있으면 끝
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);
      if (chat?.trim() && chatData) {
        const savedChat = chat;
        // Optimistic UI 적용 시.. 서버를 들렀다 오지 않으므로 우리가 임의로 데이터를 만들어야 한다.
        // 서버에 갔다오지 않았지만, 마치 갔다와서 데이터가 있는 것처럼 만들어낸다.
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          })
          return prevChatData;
          // 일단 이전의 데이터를 먼저 보내서, 마치 서버와 통신하여 보내는 것처럼 하지만
          // 사실은 일단 갖고 있는 것을 띄운 뒤 axios 요청을 보내는 것임
        }, false) // shouldRevalidate가 false여야 된다는 뜻임
          .then(() => {
            setChat('');
            scrollbarRef.current?.scrollToBottom();
          })
          // 화면에 먼저 그리고, 그다음에 서버에 요청 보내고, 실패하면 revalidate 때문에 원래 있는 데이터가 사라진다.
        // chat이 있는 경우
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
            // 채팅 값을 content로 등록하고
          })
          .then(() => {
            revalidate();
            setChat('');
            scrollbarRef.current?.scrollToBottom();
          })
          .catch(console.error);
      }
      setChat('');
    },
    [chat, chatData, myData, userData, workspace, id],
  );

  // 소켓에서 서로 DM 보내기
  const onMessage = useCallback((data: IDM) => {
    // id는 상대방 아이디
    if (data.SenderId === Number(id) && myData.id !== Number(id)) {
      mutateChat((chatData) => {
        // socket.io가 서버로부터 실시간으로 데이터를 가져다 줌
        // 그걸 또 굳이 서버에 한번 더 요청을 보낼 필요는 없음..
        // 새롭게 생성된 DM을 갖다주는데, 그걸 그대로 갖다 쓰면 되지
        // revalidate할 필요는 없음
        chatData?.[0].unshift(data);
        // 가장 최신 배열의 가장 최신으로 데이터 넣기
        return chatData;
      }, false).then(() => {
        if (scrollbarRef.current) {
          if (
            scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
          ) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 50);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
  socket?.on('dm', onMessage);
  return () => {
    socket?.off('dm', onMessage);
    }
  }, [socket, onMessage])

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData])

  if (!userData || !myData) {
    return null;
    // 로딩중이거나, 에러인 경우
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  // [].concat(...chatData).reverse(): 빈 배열에 chatData를 추가해 준다는 뜻. 그리고 그것을 reverse한다는 뜻
  // [...chatData].reverse()와 동일한 의미
  // 2차원 배열을 1차원 배열로 만들어주고(.flat()) 뒤집기(reverse)
  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      {/* <ChatList chatData={chatData} /> */}
      <ChatList
        chatSections={chatSections}
        scrollRef={scrollbarRef}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
