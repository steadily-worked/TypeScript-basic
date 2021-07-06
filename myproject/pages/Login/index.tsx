import useInput from '@hooks/useInput';
import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/Signup/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const Login = () => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);
  // 여기서 data는, fetcher.ts의 response.data가 된다.
  // SWR을 사용하면, 다른 곳에 갔다 다시 돌아올 때마다 자동으로 요청을 다시 보내준다.
  // 그래서 화면이 최신으로 유지가 된다.
  // 로그인 후에 데이터를 전해줄 API
  const [loginError, setLoginError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          revalidate();
        })
        .catch((error) => {
          setLoginError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/channel" />;
  }

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  //

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;

// 3090에서 3095로 보낸다..
// CORS 문제는 발생하지 않지만, 프론트 서버 주소와 백엔드 서버 주소가 다르다면 쿠키가 보내지지 않는다.
// 백엔드에서 프론트엔드로 쿠키를 생성해줄수도, 프론트에서 백으로 쿠키를 보내줄 수도 없다.
// withCredentials: true 설정을 통해 이 문제를 해결할 수 있다.
// 이를 통해 쿠키 생성이 되고, 데이터 전달도 된다.

// 로그인을 눌렀을 때, 로그인 완료되고 users API 호출하기
// SWR이 몇 초 간격으로 주기적으로 요청을 보내는데, 너무 빈번하면 서버에 무리가 가므로
// 원할 때 호출하게 하려면, revalidate를 사용해야 한다.
// axios.then에 revalidate를 넣어줌으로써 fetcher 함수를 실행시킨다.
