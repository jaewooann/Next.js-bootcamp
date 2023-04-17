import type { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import type { IBoardComment } from "../../../../commons/types/generated/types";

export interface ICommentWriteProps {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  el: IBoardComment;
}

export interface ICommentWriteUIProps {
  writer: string;
  password: string;
  contents: string;
  star: number;
  textareaCount: number;
  setStar: Dispatch<SetStateAction<number>>
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onClickComment: () => void
  onClickComplete: (e: MouseEvent<HTMLDivElement>) => void;
  onClickCancel: () => void;
  isEdit: boolean;
  el: IBoardComment;
}