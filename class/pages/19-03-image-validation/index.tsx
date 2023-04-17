import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types";
import { checkValidationFile } from "../../src/commons/libraries/validationFile";

const UPLOAD_FILE = gql`
  mutation uploadFile ($file: Upload!) {
    uploadFile (
      file: $file
      ){
      url
    }
  }
`;

export default function ImageUploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // <input type='file' multiple /> 에서 multiple 속성으로 여러개 드래그 가능
    
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile ({
        variables: {
          file
        }
      });
      console.log(result.data?.uploadFile.url);
      setImageUrl(result.data?.uploadFile.url ?? '');
    } catch(error) {
      if(error instanceof Error) Modal.error({content: error.message});
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  }

  return (
    <>
      <div style={{width: '50px', height: '50px', backgroundColor: 'gray'}} onClick={onClickImage}>이미지선택</div>
      <input style={{display: 'none'}} type="file" onChange={onChangeFile} ref={fileRef} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}