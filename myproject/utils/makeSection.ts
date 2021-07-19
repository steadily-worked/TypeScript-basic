import { IDM } from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatList: IDM[]) {
  const sections: { [key: string]: IDM[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      // sections[monthDate]가 이미 있는 경우에는 저기에 chat을 push해주고 없으면 값 부여
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
