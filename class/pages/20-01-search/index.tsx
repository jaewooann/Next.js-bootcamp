import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useState } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import type { IQuery, IQueryFetchBoardsArgs } from '../../src/commons/types/generated/types';

const FETCH_BOARDS = gql`
  query fetchBoards ($page: Int, $search: String) {
    fetchBoards (page: $page, search: $search) {
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
  const [search, setSearch] = useState('');
  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  
  console.log(data?.fetchBoards);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(e.currentTarget.id) }); // 검색에서 refetch할 때, 사용한 search 검색어가 저장되어있는 상태이므로 추가로 search 포함하지 않아도 됨.
  }

  const onClickSearch = () => {
    void refetch({ search, page: 1 });
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <>
      검색어 입력: <input type="text" onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색하기</button>
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
              <Pagination key={idx + 1} id={String(idx + 1)} onClick={onClickPage}> {idx + 1} </Pagination>
            );
          })
        }
      </div>
    </>
  );
}