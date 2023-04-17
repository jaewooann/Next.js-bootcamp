import { gql, useMutation, useQuery } from "@apollo/client";
import type { IMutation, IMutationLikeBoardArgs, IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUiPage() {
  const { data } = useQuery<Pick<IQuery, 'fetchBoard'>, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: {
      boardId: "642d94c5aef9f000281b8459",
    }
  });
  const [likeBoard] = useMutation<Pick<IMutation, 'likeBoard'>, IMutationLikeBoardArgs>(LIKE_BOARD);

  const onClickLike = () => {
    void likeBoard({ 
      variables: { boardId: "642d94c5aef9f000281b8459" },
      // refetchQueries: [
      //   {
      //     query: FETCH_BOARD,
      //     variables: { boardId: "642d94c5aef9f000281b8459" },
      //   }
      // ],
      optimisticResponse: { // 결과 data
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update(cache, { data }) {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "642d94c5aef9f000281b8459" },
          data: {
            fetchBoard: {
              _id: "642d94c5aef9f000281b8459",
              __typename: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  }

  return (
    <>
      <div>현재카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기!!</button>
    </>
  );
}