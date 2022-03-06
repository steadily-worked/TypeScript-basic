import React, { useState, useCallback } from 'react';
import { Header, Form, Label, Input, LinkContainer, Button, Error } from '@pages/SignUp/styles';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [])
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck)
  }, [email, nickname, password, passwordCheck])
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
              {/* {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>} */}
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

export default Login