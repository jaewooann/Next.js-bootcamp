import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean
  data?: Pick<IQuery, "fetchBoard">
}

export interface IBoardWriteUIProps {
  onClickSubmit: () => void 
  onClickUpdate: () => void 
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void 
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void 
  onChangeContents: (e: ChangeEvent<HTMLInputElement>) => void 
  mycolor: boolean 
  isEdit: boolean 
  data: Pick<IQuery, "fetchBoard"> 
}

export interface IBlueButtonProps {
  aaa: string
  qqq: string
  zzz: boolean
}

export interface IMyvariables {
  number: number
  writer?: string
  title?: string
  contents?: string
}