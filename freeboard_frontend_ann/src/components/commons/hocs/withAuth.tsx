import { Modal } from "antd";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

export const withAuth = (Component: ComponentType) => <P extends {}>(props: P) => {
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('accessToken')) {
      Modal.error({ content: '로그인 후 이용 가능합니다.' });
      void router.push('/login');
    }
  }, []);
  

  return <Component {...props} />
}