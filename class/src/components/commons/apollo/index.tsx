import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../commons/store';
import { getAccessToken } from '../../../commons/libraries/getAccessToken';

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element
}
export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 1. 프리렌더링 예제 - process.browser 방법
  // if (process.browser) {
  //   // console.log('지금은 브라우저다!!');
  //   // const result = localStorage.getItem('accessToken');
  //   // console.log(result);
  //   // if (result) setAccessToken(result);
  // } else {
  //   // window.alert('안녕하세요');
  //   // console.log('지금은 프론트엔드 서버다!!(즉, yarn dev로 실행시킨 프로그램 내부다!!!)');
  //   // const result = localStorage.getItem('accessToken');
  //   // console.log(result);
  //   // if (result) setAccessToken(result);
  // }

  // 2. 프리렌더링 예제 - typeof window 방법
  // if (typeof window !== 'undefined') {
  //   // console.log('지금은 브라우저다!!');
  //   // const result = localStorage.getItem('accessToken');
  //   // console.log(result);
  //   // if (result) setAccessToken(result);
  // } else {
  //   // window.alert('안녕하세요');
  //   // console.log('지금은 프론트엔드 서버다!!(즉, yarn dev로 실행시킨 프로그램 내부다!!!)');
  //   // const result = localStorage.getItem('accessToken');
  //   // console.log(result);
  //   // if (result) setAccessToken(result);
  // }

  // 3. 프리렌더링 무시 - useEffect 방법
  useEffect(() => {
    // 1. 기존방식(refreshToken 이전)
    // console.log('지금은 브라우저다!!');
    // const result = localStorage.getItem('accessToken');
    // console.log(result);
    // if (result) setAccessToken(result);

    // 2. 새로운방식(refreshToken 이후) - 새로고침 했을 때
    void getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러를 캐치
    if(graphQLErrors) {
      for(const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if(err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            // 2-1. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기 (글로벌 스테이트)
              setAccessToken(newAccessToken);

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하기
              if(typeof newAccessToken !== 'string') return;
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 방금 수정한 쿼리 재요청하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include"
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // cache: new InMemoryCache() // 나중에 하기
    cache: GLOBAL_STATE, // 페이지 전환(_app.tsx 리렌더) 되어도, 캐시 유지
    connectToDevTools: true,
  });

  return (
    <>
      <ApolloProvider client={client}>
        {props.children}
      </ApolloProvider>
    </>
  );
}