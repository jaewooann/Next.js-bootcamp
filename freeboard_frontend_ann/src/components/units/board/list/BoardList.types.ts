import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "../../../../commons/types/generated/types"
import type { MouseEvent } from 'react';
import type { ApolloQueryResult } from "@apollo/client";

export interface IBoardListUIProps {
  data?: Pick<IQuery, "fetchBoards">;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  keyword: string;
  count?: number;
  refetchBoardsCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoardsCount'>>>;
  onChangeKeyword: (value: string) => void;
  onClickMoveToBoardNew: () => void;
  onClickMoveToBoardDetail: (e: MouseEvent<HTMLDivElement>) => void;
}

export interface ISearchTokenProps {
  isMatched: boolean;
}