import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types";

// const UPLOAD_FILE = gql`
//   mutation uploadFile ($file: Upload!) {
//     uploadFile (
//       file: $file
//       ){
//       url
//     }
//   }
// `;

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState('');
  // const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // <input type="file" multiple> multiple 속성으로 여러개 드래그 가능
    if(!file) return;
    console.log(file);

    // try {
    //   const result = await uploadFile ({
    //     variables: {
    //       file
    //     }
    //   });
    //   console.log(result.data?.uploadFile.url);
    //   setImageUrl(result.data?.uploadFile.url ?? '');
    // } catch(error) {
    //   if(error instanceof Error) Modal.error({content: error.message});
    // }

    // ==================================================================================================================================

    // 1. 임시URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
    // const result = URL.createObjectURL(file);
    // console.log(result);
    // setImageUrl(result);

    // 2. 임시URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        console.log(e.target?.result); // 게시판에서 event.target.id 대신 event.currentTarget.id를 썼던 이유: event.target은 태그만을 가리키지 않음.
        setImageUrl(e.target?.result);
      }
    };

  };

  return (
    <>
      <input type="file" onChange={onChangeFile} /* multiple */ />
      <img src={imageUrl} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`} /> */}
    </>
  );
}