import type { MouseEvent } from 'react';
import type { IQuery } from '../../../../commons/types/generated/types';

export interface ICommentListUIProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  onLoadMore: () => void;
  onClickWriter: (e: MouseEvent<HTMLDivElement>) => void;
  onClickDelete: (e: MouseEvent<HTMLDivElement>) => void;
}