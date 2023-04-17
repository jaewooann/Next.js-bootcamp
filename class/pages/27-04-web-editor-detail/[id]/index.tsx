import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Dompurify from 'dompurify';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId){
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.id
    }
  });

  console.log('=========');
  console.log(data);
  console.log('=========');

  return (
    <>
      {/* <div>{router.query.id}번 게시글로 이동이 완료되었습니다!!!</div> */}
      <div>작성자: {data ? data.fetchBoard.writer : '로딩중입니다.'}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}
      {typeof window !== 'undefined' && (
        <div dangerouslySetInnerHTML={{
          __html: Dompurify.sanitize(data?.fetchBoard.contents),
        }}
        ></div>
      )}
    </>
  );
}

// playground XSS 공격
// <img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />