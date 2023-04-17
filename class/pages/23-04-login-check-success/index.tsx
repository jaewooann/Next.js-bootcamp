import { gql, useQuery } from "@apollo/client";
import type { IQuery } from "../../src/commons/types/generated/types";
import { useEffect } from 'react';
import { Modal } from "antd";
import { useRouter } from "next/router";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LoginSuccessPage() {
  const router = useRouter();
  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      Modal.error({ content: '로그인 후 이용 가능합니다!' });
      void router.push('/23-03-login-check');
    }
  }, []);
  
  return (
    <>  
      {data?.fetchUserLoggedIn.name}님 환영합니다!
    </>
  );
}