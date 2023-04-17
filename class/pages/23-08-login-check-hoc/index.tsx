import { useState } from "react";
import type { ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import type { IMutation, IMutationLoginUserArgs } from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser ($email: String!, $password: String!){
    loginUser (email: $email, password: $password){
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation<Pick<IMutation, 'loginUser'>, IMutationLoginUserArgs>(LOGIN_USER);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePasswrd = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = async () => {
    try {
      // 1. 로그인 해서 accessToken 받아오기
      const result = await loginUser({
        variables: {
          email,
          password
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      // 2. accessToken을 globalState에 저장하기
      if (!accessToken) {
        Modal.error({ content: '로그인에 실패하였습니다. 다시 시도해 주세요.' });
        return;
      }
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken); // 임시 사용(나중에 지울 예정)
      
      // 3. 로그인 성공 페이지로 이동하기
      router.push('/23-09-login-check-hoc-success');

    } catch(error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} /><br />
      비밀번호: <input type="password" onChange={onChangePasswrd} />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}