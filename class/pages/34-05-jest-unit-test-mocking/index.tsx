import { ChangeEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) { # 변수의 타입 적는 곳
    createBoard( # 실제 우리가 전달할 변수 적는 곳
      createBoardInput: $createBoardInput
    ){
      _id
      writer
      title
      contents
    }
  }
`

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    // const writer = 'qqq'; // 스코프 체인
    const result = await createBoard({
      variables: { // variables 이게 $ 역할을 해줌
        createBoardInput: {
          writer,
          title,
          contents,
          password: '1234',
        }
      }  
    });
    console.log(result);
    // alert(result.data.createBoard._id);
    router.push(`/boards/${result.data.createBoard._id}`);
  }

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }

  return (
    <>
      작성자: <input role='input-writer' type="text" onChange={onChangeWriter} /><br />
      제목: <input role='input-title' type="text" onChange={onChangeTitle} /><br />
      내용: <input role='input-contents' type="text" onChange={onChangeContents} /><br />
      <button role='submit-button' onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}