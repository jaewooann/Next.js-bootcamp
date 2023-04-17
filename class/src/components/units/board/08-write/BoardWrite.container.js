import { useState } from 'react';
import { useMutation } from '@apollo/client';
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries';
import { useRouter } from 'next/router';

export default function BoardWrite(props) {
  const router = useRouter();

  const [mycolor, setMycolor] = useState(false);

  // 자바스크립트 영역
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickSubmit = async () => {
    // const writer = 'qqq'; // 스코프 체인
    const result = await createBoard({
      variables: { // variables 이게 $ 역할을 해줌
        writer,
        title,
        contents
      }
    });
    console.log(result);
    alert(result.data.createBoard.message);
    router.push(`/08-05-boards/${result.data.createBoard.number}`);
  }

  const onClickUpdate = async () => {
    // 1. 수정하기 뮤테이션 날리기
    const result = await updateBoard({
      variables: {
        number: Number(router.query.number),
        writer,
        title,
        contents
      }
    });

    // 2. 상세페이지로 이동하기
    console.log(result);
    alert(result.data.updateBoard.message);
    router.push(`/08-05-boards/${result.data.updateBoard.number}`);
  }

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
    if(e.target.value && title && contents) {
      setMycolor(true);
    }
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    if(writer && e.target.value && contents) {
      setMycolor(true);
    }
  }
  const onChangeContents = (e) => {
    setContents(e.target.value);
    if(writer && title && e.target.value) {
      setMycolor(true);
    }
  }

  // HTML 영역(return 아래)
  return (
    <BoardWriteUI 
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      mycolor={mycolor}
      isEdit={props.isEdit}
    />
  );
}