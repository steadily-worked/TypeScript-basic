import React, { VFC, useCallback, forwardRef, ForwardedRef, RefObject } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';
// 굳이 라이브러리에 있는 걸 다시 만들 필요는 없다.
interface Props {
  chatSections: { [key: string]: IDM[] };
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
  isReachingEnd: boolean;
  scrollRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({ chatSections, setSize, isReachingEnd, scrollRef }) => {
  // const scrollbarRef = useRef(null);
  // 상위 컴포넌트에서 선언하는 게 좋음.. 채팅을 쳤을 때 스크롤바를 컨트롤해서 제일 아래로 내리려면
  // 상위 컴포넌트로 가야함. DirectMessage 페이지에서.
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      setSize((prevSize) => prevSize + 1).then(() => {
        // 스크롤 위치 유지
        if (scrollRef?.current) {
          scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight)
        }
      });
    }
  }, []);

  // const {
  //   data: chatData,
  //   mutate: mutateChat,
  //   revalidate,
  // } = useSWR<IDM[]>(`api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);
  // 컴포넌트를 공동으로 쓸 때는 Props가 필요한 경우도 있다.
  // ChatList는 DM에서도 쓰지만, 채널에서도 쓴다.
  // 근데 지금 보면, useSWR의 API에 DM이 해당되어 있으므로 이경우에는 그냥 부모 컴포넌트에서
  // 이 ChatList 컴포넌트를 불러올 때 Props를 지정해줘야 한다.
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {/* 스크롤 내릴 때 발생하는 onScrollFrame */}
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
        {/* {chatSections?.map((chat) => (
          <Chat key={chat.id} data={chat} />
        ))} */}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
