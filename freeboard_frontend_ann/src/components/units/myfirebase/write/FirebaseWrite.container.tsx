import { useState } from "react";
import type { ChangeEvent } from "react";
import FirebaseWriteUI from "./FirebaseWrite.presenter";
import { collection, addDoc, getFirestore } from 'firebase/firestore/lite';
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { useRouter } from "next/router";

export default function FirebaseWrite() {
  const router = useRouter();
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }

  const onClickSubmit = async () => {
    const board = collection(getFirestore(firebaseApp), 'board');
    await addDoc(board, {
      writer,
      title,
      contents
    });
    alert('게시물 등록을 완료했습니다.');
    router.push('/myfirebase');
  }

  return (
    <>
      <FirebaseWriteUI
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
}