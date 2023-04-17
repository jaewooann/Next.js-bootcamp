import { UseMoveToPage } from '../../src/components/commons/hooks/useMoveToPage';

export default function CustomHooksUseMoveToPage() {
  const { onClickMoveToPage } = UseMoveToPage();

  return (
    <>
      <button onClick={onClickMoveToPage('/boards')}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage('/markets')}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage('/mypage')}>마이페이지로 이동</button>
    </>
  );
}