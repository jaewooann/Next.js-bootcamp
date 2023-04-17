import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useState } from 'react';
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
  const [startpage, setStartpage] = useState(1);

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  
  console.log(data?.fetchBoards);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(e.currentTarget.id) });
  }

  const onClickPrevPage = () => {
    setStartpage((prev) => prev - 10);
    void refetch({ page: startpage - 10 });
  }

  const onClickNextPage = () => {
    setStartpage((prev) => prev + 10);
    void refetch({ page: startpage + 10 });
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
        <span onClick={onClickPrevPage}>이전페이지</span>
        {
          new Array(10).fill(1).map((_, idx) => {
            return (
              <Pagination key={idx + startpage} id={String(idx + startpage)} onClick={onClickPage}> {idx + startpage} </Pagination>
            );
          })
        }
        <span onClick={onClickNextPage}>다음페이지</span>
      </div>

      {/* <div>
        {
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, idx) => {
            return (
              <Pagination key={idx + 1} id={String(idx + 1)} onClick={onClickPage}> {idx + 1} </Pagination>
            );
          })
        }
      </div> */}

      {/* <div>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el => {
              return (
                <Pagination key={el} id={String(el)} onClick={onClickPage}> {el} </Pagination>
              ); 
          }))
        }
      </div> */}

      {/* <Pagination id='1' onClick={onClickPage}> 1 </Pagination>
      <Pagination id='2' onClick={onClickPage}> 2 </Pagination>
      <Pagination id='3' onClick={onClickPage}> 3 </Pagination> */}
    </>
  );
}