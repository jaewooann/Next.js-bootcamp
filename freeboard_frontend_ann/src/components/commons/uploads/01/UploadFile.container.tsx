import { useMutation } from "@apollo/client";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import UploadFileUI from "./UploadFile.presenter";
import { UPLOAD_FILE } from "./UploadFile.queries";
import { Modal } from "antd";
import type { IUploadFileProps } from "./UploadFile.types";

export default function UploadFile(props: IUploadFileProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickImage = () => {
    fileRef.current?.click();
  }

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file?.size) {
      alert('파일이 존재하지 않습니다.');
      return;
    }
    if (file?.size > 5 * 1024 * 1024) {
      alert('파일 사이즈가 5MB를 초과하였습니다.');
      return;
    }

    try {
      const result = await uploadFile({
        variables: {
          file
        }
      });
      props.onChangeFileUrls(result.data.uploadFile.url, props.idx);
    } catch (error) {
      if(error instanceof Error) Modal.error({content: error.message});
    }
  }

  return (
    <>
      <UploadFileUI
        onClickImage={onClickImage}
        onChangeFile={onChangeFile}
        fileRef={fileRef}
        fileUrl={props.fileUrl}
      />
    </>
  );
}