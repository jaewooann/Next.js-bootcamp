import { UploadButton, UploadImg } from "../../../units/board/write/BoardWrite.styles";
import type { IUploadFileUIProps } from "./UploadFile.types";

export default function UploadFileUI(props: IUploadFileUIProps) {

  return (
    <>
      {props.fileUrl 
        ? 
        <UploadImg onClick={props.onClickImage} src={`https://storage.googleapis.com/${props.fileUrl}`} />
        :
        <UploadButton onClick={props.onClickImage}>+</UploadButton>
      }
      <input type="file" style={{display: 'none'}} onChange={props.onChangeFile} ref={props.fileRef} />
    </>
  );
}