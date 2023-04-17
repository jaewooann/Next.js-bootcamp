import { useRouter } from 'next/router';

export default function StaticRoutingPage() {

  const router = useRouter();

  const onClickMove1 = () => {
    router.push('/05-08-dynamic-routed-board-query/238');
  }

  const onClickMove2 = () => {
    router.push('/05-08-dynamic-routed-board-query/239');
  }

  const onClickMove3 = () => {
    router.push('/05-08-dynamic-routed-board-query/240');
  }

  const onClickMove100 = () => {
    router.push('/05-08-dynamic-routed-board-query/1000');
  }

  return (
    <>
      <button onClick={onClickMove1} type="button">238번 게시글로 이동하기!!!</button><br />
      <button onClick={onClickMove2} type="button">239번 게시글로 이동하기!!!</button><br />
      <button onClick={onClickMove3} type="button">240번 게시글로 이동하기!!!</button><br />
      <button onClick={onClickMove100} type="button">1000번 게시글로 이동하기!!!</button>
    </>
  );
}