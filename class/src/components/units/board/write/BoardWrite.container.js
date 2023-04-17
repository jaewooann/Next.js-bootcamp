import { useState } from 'react';
import { useMutation } from '@apollo/client';
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from './BoardWrite.queries';

export default function BoardWrite() {

  // 자바스크립트 영역
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    // const writer = 'qqq'; // 스코프 체인
    const result = await createBoard({
      variables: { // variables 이게 $ 역할을 해줌
        writer: writer,
        title: title,
        contents: contents
      }
    });
    console.log(result);
    alert(result.data.createBoard.message);
  }

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e) => {
    setContents(e.target.value);
  }

  // HTML 영역(return 아래)
  return (
    <BoardWriteUI 
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
    />
  );
}