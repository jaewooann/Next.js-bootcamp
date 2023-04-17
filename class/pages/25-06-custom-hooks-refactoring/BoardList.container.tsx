import { useQuery } from "@apollo/client";
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "../../src/commons/types/generated/types";
import BoardListUI from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { UseMoveToPage } from "../../src/components/commons/hooks/useMoveToPage";
import { useSearch } from "../../src/components/commons/hooks/useSearch";

export default function BoardList() {
  const { onClickMoveToPage } = UseMoveToPage();
  const { keyword, onChangeKeyword } = useSearch();

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: fetchBoardsCount, refetch: refetchBoardsCount } = useQuery<Pick<IQuery, 'fetchBoardsCount'>, IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT);

  return (
    <>
      <BoardListUI 
        data={data} 
        refetch={refetch}
        keyword={keyword}
        count={fetchBoardsCount?.fetchBoardsCount}
        refetchBoardsCount={refetchBoardsCount}
        onChangeKeyword={onChangeKeyword}
        onClickMoveToPage={onClickMoveToPage}
      />
    </>
  );
}