import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import type { IQuery, IQueryFetchBoardArgs } from "../../../../src/commons/types/generated/types";

export const FETCH_BOARD = gql`
query fetchBoard ($boardId: ID!) {
  fetchBoard (
    boardId: $boardId
    ){
    _id
    writer
    title
    contents
    createdAt
    youtubeUrl
    boardAddress {
      zipcode
      address
      addressDetail
    }
    images
  }
}
`;

export default function BoardWritePage() {
  const router = useRouter();

  // if(typeof router.query.boardId !== "string") {
  //   router.push('/');
  //   return <></>
  // }

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: {
      boardId: String(router.query.boardId)
    },
  });
  
  return (
    <BoardWrite isEdit={true} data={data} />
  );
}