import { gql, useQuery } from "@apollo/client"
import type { IQuery } from "../src/commons/types/generated/types";
import styled from '@emotion/styled';

const FETCH_USER_LOGGED_IN = gql`
query fetchUserLoggedIn {
  fetchUserLoggedIn {
    _id
    email
    name
  }
}
`;

const Wrapper = styled.div`
  height: calc(100vh - 580px);
`;

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);
  
  return (
    <>
      <Wrapper>
        <TextWrapper>
          {data?.fetchUserLoggedIn.name}님 환영합니다.
        </TextWrapper>
      </Wrapper>
    </>
  )
}
