import type { ApolloQueryResult } from "@apollo/client";
import type { MouseEvent } from "react";
import type { IQuery, IQueryFetchBoardsArgs } from "../../../../commons/types/generated/types";

export interface IPaginations01Props {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  count?: number;
}

export interface IPaginations01UIProps {
  startpage: number;
  lastPage: number | boolean;
  activedPage: number;
  onClickPage: (e: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevBtn: () => void;
  onClickNextBtn: () => void;
}