import type { DocumentData } from "firebase/firestore/lite";

export interface IFirebaseListUIProps {
  dataBoards: DocumentData[];
  onClickMoveToBoardNew: () => void;
}