import type { IQuery } from "../../../../commons/types/generated/types"

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, "fetchBoard">
  // alldata: any
  onClickLike: () => void
  onClickDislike: () => void
  onClickMoveToBoards: () => void
  onClickMoveToUpdate: () => void
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}