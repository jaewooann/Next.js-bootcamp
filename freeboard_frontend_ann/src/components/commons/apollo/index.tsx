import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from '../../../commons/store/index';

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const result = localStorage.getItem('accessToken');
    if (result) setAccessToken(result);
  }, []);
  

  const uploadLink = createUploadLink({
    uri: 'http://backendonline.codebootcamp.co.kr/graphql',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE, // 페이지 전환 되어도 캐시 유지
  });

  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}