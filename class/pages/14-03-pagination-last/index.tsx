import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../src/commons/types/generated/types';
import Child1 from '../../src/components/units/14-pagination';
import Child2 from '../../src/components/commons/pagination/pagination';

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
const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function StaticRoutedPage() {
  const [startpage, setStartpage] = useState<number>(1);

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);

  // data 위와 아래가 이름이 똑같으니 : qqq 이런식으로 바꿔줄 수
  const { data: dataBoardsCount } = useQuery<Pick<IQuery, 'fetchBoardsCount'>, IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT);

  // const 마지막페이지 = Math.ceil(전체게시글 수 / 10)
  const lastPage = 
    dataBoardsCount !== undefined 
      ? Math.ceil(dataBoardsCount.fetchBoardsCount / 10) 
      : 0;

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(e.currentTarget.id) });
  }

  const onClickPrevPage = () => {
    if (startpage === 1) return;
    setStartpage((prev) => prev - 10);
    void refetch({ page: startpage - 10 });
  }

  const onClickNextPage = () => {
    console.log(lastPage);
    if (startpage + 10 <= lastPage) {
      setStartpage((prev) => prev + 10);
      void refetch({ page: startpage + 10 });
    }
  }

  return (
    <>
      <Child1 data={data} />
      <Child2 
        startpage={startpage} 
        lastPage={lastPage}
        onClickPage={onClickPage}
        onClickPrevPage={onClickPrevPage}
        onClickNextPage={onClickNextPage}
      />

      {/* <div>
        <PrevBtn onClick={onClickPrevPage}>이전페이지</PrevBtn>
        {
          new Array(10).fill(1).map((_, idx) => {
            if(idx + startpage <= lastPage) {
              return (
                <Pagination key={idx + startpage} id={String(idx + startpage)} onClick={onClickPage}> {idx + startpage} </Pagination>
              );
            } else {
              return <span></span>;
            }
          })
        }
        <NextBtn onClick={onClickNextPage}>다음페이지</NextBtn>
      </div> */}

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