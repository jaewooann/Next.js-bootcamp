import { useRouter } from "next/router";
import FirebaseListUI from "./FirebaseList.presenter";
import { collection, getFirestore, getDocs } from 'firebase/firestore/lite';
import type { DocumentData } from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import { firebaseApp } from "../../../../commons/libraries/firebase";

export default function FirebaseList() {
  const router = useRouter();
  const [dataBoards, setDataBoards] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const board = collection(getFirestore(firebaseApp), 'board');
      const result = await getDocs(board);
      const boards = result.docs.map(el => el.data());
      setDataBoards(boards);
      console.log(boards);
    }
    void fetchBoards();
  }, [])
  

  const onClickMoveToBoardNew = () => {
    router.push('/myfirebase/new')
  };

  return (
    <>
      <FirebaseListUI
        dataBoards={dataBoards}
        onClickMoveToBoardNew={onClickMoveToBoardNew}
      />
    </>
  );
}