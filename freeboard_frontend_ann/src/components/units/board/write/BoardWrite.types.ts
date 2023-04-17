import type { ChangeEvent } from "react";
import type { Address } from "react-daum-postcode";
import type { InputMaybe, IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean
  data?: Pick<IQuery, "fetchBoard">
}

export interface IBoardWriteUIProps {
  isEdit: boolean
  data?: Pick<IQuery, "fetchBoard">
  isModalOpen: boolean
  zipcode: string
  roadAddress: string
  etcAddress: string
  onToggleModal: () => void
  onChangeEtcAddress: (e: ChangeEvent<HTMLInputElement>) => void
  handleComplete: (address: Address) => void
  onClickSubmit: () => void
  onClickUpdate: () => void
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onChangeYoutubeUrl: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeFileUrls: (fileUrl: string, idx: number) => void;
  writerError: string
  passwordError: string
  titleError: string
  contentsError: string
  isActive: boolean
  fileUrls: string[]
}

export interface ISubmitButtonProps {
  isActive: boolean
}

export interface IMyVariales {
  title?: string
  contents?: string
  youtubeUrl?: string
  boardAddress?: {
    zipcode?: string
    address?: string
    addressDetail?: string
  }
  images?: string[];
}