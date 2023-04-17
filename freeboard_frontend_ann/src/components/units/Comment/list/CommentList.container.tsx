import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import CommentListUI from "./CommentList.presenter";
import { DELETE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./CommentList.queries";
import type { MouseEvent } from 'react';
import type { IMutation, IMutationDeleteBoardCommentArgs, IQuery, IQueryFetchBoardCommentsArgs } from "../../../../commons/types/generated/types";

export default function CommentList() {
  const router = useRouter();

  const [deleteBoardComment] = useMutation<Pick<IMutation, "deleteBoardComment">, IMutationDeleteBoardCommentArgs>(DELETE_BOARD_COMMENT);
  const { data, fetchMore } = useQuery<Pick<IQuery, "fetchBoardComments">, IQueryFetchBoardCommentsArgs>(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: String(router.query.boardId)
    }
  });
  console.log(data);

  const onLoadMore = () => {
    if (data === undefined) return;

    console.log(data.fetchBoardComments);

    void fetchMore({
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments === undefined)
        return {
          fetchBoardComments: [...prev.fetchBoardComments]
        }
        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments]
        }
      }
    })
  }

  const onClickWriter = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    alert(`${e.currentTarget.id}님이 작성한 글입니다.`);
  }

  const onClickDelete = async (e: MouseEvent<HTMLDivElement>) => {
    const myPassword = prompt('비밀번호를 입력해주세요');
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: e.currentTarget.id
        },
        refetchQueries: [{
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: router.query.boardId
          }
        }]
      })
    } catch(error) {
      if(error instanceof Error) {
        alert(error.message);
      }
    }
  }
  
  return (
    <>
      <CommentListUI
        data={data}
        onLoadMore={onLoadMore}
        onClickWriter={onClickWriter}
        onClickDelete={onClickDelete}
      />
    </>
  );
} 