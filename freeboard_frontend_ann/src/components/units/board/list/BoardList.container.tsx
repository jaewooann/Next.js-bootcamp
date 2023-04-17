import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "../../../../commons/types/generated/types";
import BoardListUI from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useState } from 'react';
import type { MouseEvent } from 'react';

export default function BoardList() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: fetchBoardsCount, refetch: refetchBoardsCount } = useQuery<Pick<IQuery, 'fetchBoardsCount'>, IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT);

  const onClickMoveToBoardNew = () => {
    router.push('/boards/new');
  }

  const onClickMoveToBoardDetail = (e: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/${e.currentTarget.id}`);
  }

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  }

  return (
    <>
      <BoardListUI 
        data={data} 
        refetch={refetch}
        keyword={keyword}
        count={fetchBoardsCount?.fetchBoardsCount}
        refetchBoardsCount={refetchBoardsCount}
        onChangeKeyword={onChangeKeyword}
        onClickMoveToBoardNew={onClickMoveToBoardNew}
        onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      />
    </>
  );
}