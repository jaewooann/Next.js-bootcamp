import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../../commons/store';
import type { IMutation } from '../../../../commons/types/generated/types';

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
`;

const InnerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

const Logo = styled.h2`
  font-style: italic;
  cursor: pointer;
`;

const ButtonArea = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.div`
  border: none;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default function LayoutHeader() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const [logoutUser] = useMutation<Pick<IMutation, 'logoutUser'>>(LOGOUT_USER);

  const onClickLogo = () => {
    void router.push('/boards');
  }

  const onClickLogin = () => {
    void router.push('/login');
  }

  const onClickLogout = () => {
    
  }

  const onClickRegister = () => {
    void router.push('/register');
  }

  return (
    <>
      <Wrapper>
        <InnerWrapper>
          <Logo onClick={onClickLogo}>THEAHN</Logo>
          <ButtonArea>
            <Button onClick={accessToken ? onClickLogout : onClickLogin}>{accessToken ? '로그아웃' : '로그인'}</Button>
            <Button onClick={onClickRegister}>회원가입</Button>
          </ButtonArea>
        </InnerWrapper>
      </Wrapper>
    </>
  );
}