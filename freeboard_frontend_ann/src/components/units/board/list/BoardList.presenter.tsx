import { getDate } from "../../../../commons/utils/utils";
import Paginations01 from "../../../commons/paginations/01/Paginations01.container";
import { Button, Column, ColumnHeader, ColumnTitle, Row, SearchToken, TableBottom, TableTop, Wrapper } from "./BoardList.styles";
import type { IBoardListUIProps } from "./BoardList.types";
import { v4 as uuidv4 } from 'uuid';
import SearchBar from "../../../commons/searchbar/01/Searchbar.container";

export default function BoardListUI(props: IBoardListUIProps) {
  return (
    <>
      <Wrapper>
        <SearchBar
          refetch={props.refetch}
          refetchBoardsCount={props.refetchBoardsCount}
          onChangeKeyword={props.onChangeKeyword}
        />
        <TableTop>
            <Row>
              <ColumnHeader>번호</ColumnHeader>
              <ColumnHeader>제목</ColumnHeader>
              <ColumnHeader>작성자</ColumnHeader>
              <ColumnHeader>날짜</ColumnHeader>
            </Row>
        </TableTop>
        {props.data?.fetchBoards?.map((el, idx) => {
          return (
            <Row 
              key={el._id}
            > 
              <Column>{idx + 1}</Column>
              <ColumnTitle 
                id={el._id} 
                onClick={props.onClickMoveToBoardDetail}
              > 
                {el.title
                  .replaceAll(props.keyword, `#$%${props?.keyword}#$%`)
                  .split('#$%')
                  .map(el => (
                    <SearchToken key={uuidv4()} isMatched={props.keyword === el}>{el}</SearchToken>
                  ))
                }
              </ColumnTitle>
              <Column>{el.writer}</Column>
              <Column>{getDate(el.createdAt)}</Column>
            </Row>
          );
        })}
        <Paginations01 
          refetch={props.refetch} 
          count={props.count} 
        />
        <TableBottom>
          <Button onClick={props.onClickMoveToBoardNew}>게시물 등록하기</Button>
        </TableBottom>
      </Wrapper>
    </>
  );
}