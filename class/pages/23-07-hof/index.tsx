import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import type { MouseEvent } from 'react';
import type { IQuery, IQueryFetchBoardsArgs } from '../../src/commons/types/generated/types';

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

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
  border: 1px solid #000;
`;

const Pagination = styled.span`
  cursor: pointer;
`;

export default function StaticRoutedPage() {
  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  
  console.log(data?.fetchBoards);

  const onClickPage = (boardId: number) => (e: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: boardId });
  }

    return (
      <>
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column style={{margin: '10px'}}>{el.writer}</Column>
            <Column style={{margin: '10px'}}>{el.title}</Column>
          </Row>
        )
        )}
        <div>
          {
            new Array(10).fill(1).map((_, idx) => {
              return (
                <Pagination key={idx + 1} onClick={onClickPage(idx + 1)}> {idx + 1} </Pagination>
              );
            })
          }
        </div>
      </>
  );
}

// const aaa = (apple) => {

// }
// aaa(10);

// onClickPage(index + 1)(event);