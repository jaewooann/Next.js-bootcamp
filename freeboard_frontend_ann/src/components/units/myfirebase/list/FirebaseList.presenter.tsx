import { Button } from "antd";
import { Column, Row, TableBottom, TableTop, Wrapper } from "./FirebaseList.styles";
import type { IFirebaseListUIProps } from "./FirebaseList.types";
import { v4 as uuidv4 } from 'uuid';

export default function FirebaseListUI(props: IFirebaseListUIProps) {

  return (
    <>
      <Wrapper>
        <TableTop>
          <Row>
            <Column>번호</Column>
            <Column>제목</Column>
            <Column>내용</Column>
            <Column>작성자</Column>
          </Row>
        </TableTop>
        {props.dataBoards?.map((el: any, idx: number) => {
          return (
            <Row key={uuidv4()}>
              <Column>{idx + 1}</Column>
              <Column>{el.title}</Column>
              <Column>{el.contents}</Column>
              <Column>{el.writer}</Column>
            </Row>
          );
        })}
        <TableBottom>
          <Button onClick={props.onClickMoveToBoardNew}>등록하기</Button>
        </TableBottom>
      </Wrapper>
    </>
  );
}