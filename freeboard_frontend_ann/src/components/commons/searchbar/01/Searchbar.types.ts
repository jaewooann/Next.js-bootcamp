import type { ApolloQueryResult } from "@apollo/client";
import type { ChangeEvent } from "react";
import type { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "../../../../commons/types/generated/types";

export interface ISearchBarProps {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  refetchBoardsCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoardsCount'>>>;
  onChangeKeyword: (value: string) => void;
}

export interface ISearchBarUIProps {
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}