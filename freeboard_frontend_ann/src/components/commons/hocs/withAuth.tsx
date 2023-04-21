import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

export const withAuth = (Component: ComponentType) => <P extends {}>(props: P) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    if(!accessToken) {
      Modal.error({ content: '로그인 후 이용 가능합니다.' });
      void router.push('/login');
    }
  }, []);
  

  return <Component {...props} />
}