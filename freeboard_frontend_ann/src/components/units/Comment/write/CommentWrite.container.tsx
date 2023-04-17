import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import type { IMutation, IMutationCreateBoardCommentArgs, IMutationUpdateBoardCommentArgs, IUpdateBoardCommentInput } from "../../../../commons/types/generated/types";
import CommentWriteUI from "./CommentWrite.presenter";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from "./CommentWrite.queries";
import type { ICommentWriteProps } from "./CommentWrite.types";

export default function CommentWrite(props: ICommentWriteProps) {
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [star, setStar] = useState(0);

  const [textareaCount, setTextareaCount] = useState(0);

  const router = useRouter();
  const [createBoardComment] = useMutation<Pick<IMutation, "createBoardComment">, IMutationCreateBoardCommentArgs>(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation<Pick<IMutation, "updateBoardComment">, IMutationUpdateBoardCommentArgs>(UPDATE_BOARD_COMMENT);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    setTextareaCount(e.target.value.length);
  };

  // 등록
  const onClickComment = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: String(router.query.boardId),
        },
        refetchQueries: [{
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: router.query.boardId
          }
        }]
      });
    } catch(error) {
      if(error instanceof Error) {
        alert(error.message);
      }
    }
    setWriter('');
    setPassword('');
    setContents('');
    setStar(0);
  };

  // 수정
  const onClickComplete = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents;
      if (star !== props.el.rating) updateBoardCommentInput.rating = star;

      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: props.el._id
        },
        refetchQueries: [{
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: router.query.boardId
          },
        }],
      });
      props.setIsEdit(prev => !prev);
    } catch(error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  // 취소
  const onClickCancel = () => {
    props.setIsEdit(prev => !prev);
  }

  return (
    <>
      <CommentWriteUI 
        writer={writer}
        password={password}
        contents={contents}
        star={star}
        textareaCount={textareaCount}
        setStar={setStar}
        onChangeWriter={onChangeWriter}
        onChangePassword={onChangePassword}
        onChangeContents={onChangeContents}
        onClickComment={onClickComment}
        onClickComplete={onClickComplete}
        onClickCancel={onClickCancel}
        isEdit={props.isEdit}
        el={props.el}
      />
    </>
  );
}