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

export default function StaticRoutedPage() {
  const [myIndex, setMyIndex] = useState([
    false, // index 0
    false, // index 1
    false, // index 2
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const { data } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);

  const onClickEdit = (e: MouseEvent<HTMLButtonElement>) => {

    const qqq = [...myIndex];
    qqq[Number(e.currentTarget.id)] = true;
    console.log(qqq);
    setMyIndex(qqq);
  }

    return (
      <>
        {data?.fetchBoards.map((el, idx) => (
          <div key={el._id}>
            {!myIndex[idx] && (
              <Row>
                <Column style={{margin: '10px'}}>{el.writer}</Column>
                <Column style={{margin: '10px'}}>{el.title}</Column>
                <button id={String(idx)} onClick={onClickEdit}>수정하기</button>
              </Row>
            )}
            {myIndex[idx] && (
              <div>
                수정할 내용: <input type="text" />
              </div>
            )}
          </div>
        ))}
      </>
  );
}