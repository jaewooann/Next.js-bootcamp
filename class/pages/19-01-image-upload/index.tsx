import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types";

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
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // multiple 속성으로 여러개 드래그 가능

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

  return (
    <>
      <input type="file" onChange={onChangeFile} /* multiple */ />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}