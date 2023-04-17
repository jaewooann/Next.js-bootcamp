import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { IMutation, IMutationDeleteBoardArgs, IMutationDislikeBoardArgs, IMutationLikeBoardArgs, IQuery, IQueryFetchBoardArgs } from '../../../../commons/types/generated/types';
import BoardDetailUI from "./BoardDetail.presenter";
import { DELETE_BOARD, DISLIKE_BOARD, FETCH_BOARD, FETCH_BOARDS, LIKE_BOARD } from './BoardDetail.queries';

export default function BoardDetail() {
  const router = useRouter();

  const [deleteBoard] = useMutation<Pick<IMutation, "deleteBoard">, IMutationDeleteBoardArgs>(DELETE_BOARD);
  const [likeBoard] = useMutation<Pick<IMutation, "likeBoard">, IMutationLikeBoardArgs>(LIKE_BOARD);
  const [dislikeBoard] = useMutation<Pick<IMutation, "dislikeBoard">, IMutationDislikeBoardArgs>(DISLIKE_BOARD);
  
  // const { alldata } = useQuery<Pick<IQuery, "fetchBoards">>(FETCH_BOARDS);
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: {
      boardId: String(router.query.boardId)
    },
  });

  const onClickLike = async () => {
    if (typeof router.query.boardId !== 'string') return;
    await likeBoard({
      variables: {
        boardId: router.query.boardId
      },
      refetchQueries: [{query: FETCH_BOARD, variables: {
        boardId: router.query.boardId
      }}]
    })
  }
  
  const onClickDislike = async () => {
    if (typeof router.query.boardId !== 'string') return;
    await dislikeBoard({
      variables: {
        boardId: router.query.boardId
      },
      refetchQueries: [{
        query: FETCH_BOARD,
        variables: {
          boardId: router.query.boardId
        }
      }]
    })
  }

  const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteBoard({
      variables: {
        boardId: e.currentTarget.id
      },
      refetchQueries: [{query: FETCH_BOARDS}]
    });
    router.push('/boards');
  }

  const onClickMoveToBoards =() => {
    router.push('/boards');
  }

  const onClickMoveToUpdate = () => {
    if (typeof router.query.boardId !== 'string') {
      alert('올바르지 않은 게시글 아이디 입니다.');
      void router.push('/');
      return <></>;
    } 

    void router.push(`/boards/${router.query.boardId}/edit`);
  }

  return (
    <BoardDetailUI 
      data={data}
      // alldata={alldata}
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
      onClickMoveToBoards={onClickMoveToBoards}
      onClickMoveToUpdate={onClickMoveToUpdate}
      onClickDelete={onClickDelete}
    />
  );
}