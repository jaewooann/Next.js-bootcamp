import type { ChangeEvent, RefObject } from "react";

export interface IUploadFileProps {
  idx: number;
  fileUrl: string;
  onChangeFileUrls: (fileUrl: string, idx: number) => void;
}

export interface IUploadFileUIProps {
  onClickImage: () => void;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
}