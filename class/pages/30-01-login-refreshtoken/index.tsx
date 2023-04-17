import { useState } from "react";
import type { ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import type { IMutation, IMutationLoginUserExampleArgs } from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { useRouter } from "next/router";

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(
      email: $email,
      password: $password
    ){
      accessToken
    }
  }
`;

export default function LoginPage() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [loginUserExample] = useMutation<Pick<IMutation, 'loginUserExample'>, IMutationLoginUserExampleArgs>(LOGIN_USER_EXAMPLE);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onClickLogin = async () => {
    try {

      // 1. 로그인 해서 accessToken 받아오기
      const result = await loginUserExample({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUserExample.accessToken;
      console.log(accessToken);

      // 2. accessToken을 globalState에 저장하기
      if(!accessToken) {
        Modal.error({ content: '로그인에 실패했습니다. 다시 시도해 주세요.' });
        return;
      }
      setAccessToken(accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push('/30-02-login-refreshtoken-success');

    } catch(error) {
      if(error instanceof Error) Modal.error({ content: error.message });
    }
  }

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} /><br />
      비밀번호: <input type="password" onChange={onChangePassword} /><br />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}