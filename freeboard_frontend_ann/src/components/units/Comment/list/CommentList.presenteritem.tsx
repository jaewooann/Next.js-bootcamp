import type { IBoardComment } from "../../../../commons/types/generated/types";
import { getDate } from "../../../../commons/utils/utils";
import { useState } from 'react';
import type { MouseEvent } from 'react';
import * as S from "../list/CommentList.styles";
import CommentWrite from "../write/CommentWrite.container";

interface ICommentListItemProps {
  el: IBoardComment;
  onClickWriter: (e: MouseEvent<HTMLDivElement>) => void;
  onClickDelete: (e: MouseEvent<HTMLDivElement>) => void;
}
export default function CommentListItem(props: ICommentListItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(prev => !prev);
  }

  return (
    <>
      {!isEdit && (
        <S.Wrapper>
          <S.TopWrapper>
            <S.FlexWriter id={String(props.el?.writer)} onClick={props.onClickWriter}>
              <S.Avatar src="/images/Avatar.png"></S.Avatar>
              <div>
                <S.Writer>{props.el?.writer}</S.Writer>
                <S.Contents>{props.el?.contents}</S.Contents>
              </div>
              <S.Star value={props.el?.rating} disabled />
            </S.FlexWriter>
            <S.EditWrap>
              <S.EditBtn onClick={onClickEdit}>수정</S.EditBtn>
              <S.DeleteBtn id={props.el?._id} onClick={props.onClickDelete}>삭제</S.DeleteBtn>
            </S.EditWrap>
          </S.TopWrapper>
          <S.DateWrap>
            <S.Date>{getDate(props.el?.createdAt)}</S.Date>
          </S.DateWrap>
        </S.Wrapper>
      )}
      {isEdit && (
        <CommentWrite
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          el={props.el}
        />
      )}
    </>
  );
}