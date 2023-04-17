import { gql, useMutation } from '@apollo/client';
import { Modal } from "antd";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types";
import { checkValidationFile } from "../../src/commons/libraries/validationFile";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(
      createBoardInput: $createBoardInput
    ){
      _id
    }
  }
`
const UPLOAD_FILE = gql`
  mutation uploadFile ($file: Upload!) {
    uploadFile (
      file: $file
      ){
      url
    }
  }
`;

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password: '1234',
          title,
          contents,
          images: [imageUrl]
        }
      }
    });
    console.log(result);
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }

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
      작성자: <input type="text" onChange={onChangeWriter} /><br />
      제목: <input type="text" onChange={onChangeTitle} /><br />
      내용: <input type="text" onChange={onChangeContents} /><br />
      <div style={{width: '50px', height: '50px', backgroundColor: 'gray'}} onClick={onClickImage}>이미지선택</div>
      <input style={{display: 'none'}} type="file" onChange={onChangeFile} ref={fileRef} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}