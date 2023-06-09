import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, fromPromise } from "@apollo/client"
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from '../../../commons/store/index';
import { flatMap } from "lodash";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    })
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러 캐치
    if(graphQLErrors) {
      for(const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if(err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            // 2-1. refreshToken으로 accessToken을 재발급 받기.
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기 (글로벌 스테이트)
              setAccessToken(newAccessToken);

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하기
              if (typeof newAccessToken !== 'string') return;
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 방금 수정한 쿼리 재요청하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: 'https://backendonline.codebootcamp.co.kr/graphql',
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include'
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE, // 페이지 전환 되어도 캐시 유지
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}