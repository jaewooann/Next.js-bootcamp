import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  margin-top: 2em;
  height: 60px;
  background-color: #d9bcff;
`;

const MenuWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.p`
  width: 150px;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const QQQ = [
  {id: '/myfirebase', name: '나의파이어베이스'},
  {id: '/openapis', name: '라이브강아지'},
  {id: '/boards', name: '라이브게시판'},
  {id: '/market', name: '라이브상품'},
  {id: '/mypage', name: '마이페이지'}
];

export default function LayoutNavigation() {
  const router = useRouter();

  const onClickMenu = (e: any) => {
    void router.push(e.target.id);
  }

  // const onClickMenuBoard = () => {
  //   void router.push('/boards');
  // }
  
  // const onClickMenuMarket = () => {
  //   void router.push('/market');
  // }

  // const onClickMenuMypage = () => {
  //   void router.push('/mypage');
  // }

  return (
    <>
      <Wrapper>
        <MenuWrapper>
          {QQQ.map((el) => {
            return (
              <MenuItem key={el.id} id={el.id} onClick={onClickMenu}>{el.name}</MenuItem>
            );
          })}
          {/* <MenuItem id='/boards' onClick={onClickMenu}>게시판</MenuItem>
          <MenuItem id='/market' onClick={onClickMenu}>상품</MenuItem>
          <MenuItem id='/mypage' onClick={onClickMenu}>마이페이지</MenuItem> */}
        </MenuWrapper>
      </Wrapper>
    </>
  );
}