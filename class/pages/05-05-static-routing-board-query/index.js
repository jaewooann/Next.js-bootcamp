import { useRouter } from 'next/router';

export default function StaticRoutingPage() {

  const router = useRouter();

  const onClickMove1 = () => {
    router.push('/05-06-static-routed-board-query/1');
  }

  const onClickMove2 = () => {
    router.push('/05-06-static-routed-board-query/2');
  }

  const onClickMove3 = () => {
    router.push('/05-06-static-routed-board-query/3');
  }

  return (
    <>
      <button onClick={onClickMove1} type="button">1번 게시글로 이동하기!!!</button><br />
      <button onClick={onClickMove2} type="button">2번 게시글로 이동하기!!!</button><br />
      <button onClick={onClickMove3} type="button">3번 게시글로 이동하기!!!</button>
    </>
  );
}