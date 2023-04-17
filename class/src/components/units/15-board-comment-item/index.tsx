import styled from '@emotion/styled';
import { useState } from 'react';
import type { IBoard } from '../../../commons/types/generated/types';

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 25%;
  border: 1px solid #000;
`;

interface IBoardCommentItemProps {
  el: IBoard;
}
export default function BoardCommentItem(props: IBoardCommentItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(prev => !prev);
  }

  return (
    <>
      <div>
        {!isEdit && (
          <Row>
            <Column style={{margin: '10px'}}>{props.el.writer}</Column>
            <Column style={{margin: '10px'}}>{props.el.title}</Column>
            <button onClick={onClickEdit}>수정하기</button>
          </Row>
        )}
        {isEdit && (
          <div>
            수정할 내용: <input type="text" />
          </div>
        )}
      </div>
    </>
  );
}