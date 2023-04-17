import { gql, useApolloClient, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import type { IQuery, IQueryFetchBoardsArgs } from '../../src/commons/types/generated/types';
import { useRouter } from 'next/router';
import _ from 'lodash';

const FETCH_BOARDS = gql`
  query fetchBoards ($page: Int) {
    fetchBoards (page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard ($boardId: ID!) {
    fetchBoard (boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
  border: 1px solid #000;
`;

// const Pagination = styled.span`
//   cursor: pointer;
// `;

export default function StaticRoutedPage() {
  const router = useRouter();
  const client = useApolloClient();
  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  
  console.log(data?.fetchBoards);

  // const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
  //   void refetch({ page: Number(e.currentTarget.id) });
  // };

  const getDebounce = _.debounce(async (boardId) => {
    await client.query({
      query: FETCH_BOARD,
      variables: { boardId }
    });
  }, 500);

  const prefetchBoard = (boardId: string) => async () => {
    // useQuery
    // useLazyQuery
    // useApolloClient
    await getDebounce(boardId)
  };

  const onClickMove = (boardId: string) => () => {
    void router.push(`/32-08-data-prefetch-moved/${boardId}`);
  }

    return (
      <>
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column style={{margin: '10px'}}>{el.writer}</Column>
            <Column style={{margin: '10px'}} onMouseOver={prefetchBoard(el._id)} onClick={onClickMove(el._id)}>{el.title}</Column>
          </Row>
        )
        )}
        {/* <div>
          {
            new Array(10).fill(1).map((_, idx) => {
              return (
                <Pagination key={idx + 1} id={String(idx + 1)} onClick={onClickPage}> {idx + 1} </Pagination>
              );
            })
          }
        </div> */}
      </>
  );
}