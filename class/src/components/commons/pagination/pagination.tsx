import styled from '@emotion/styled';
import type { MouseEvent } from 'react';

const Pagination = styled.span`
  cursor: pointer;
`;
const PrevBtn = styled.span`
  cursor: pointer;
`;
const NextBtn = styled.span`
  cursor: pointer;
`;

interface IChild2Props {
  startpage: number;
  lastPage: number;
  onClickPage: (e: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
export default function Child2(props: IChild2Props) {

  return (
    <>
      <div>
        <PrevBtn onClick={props.onClickPrevPage}>이전페이지</PrevBtn>
        {
          new Array(10).fill(1).map((_, idx) => {
            return (
              idx + props.startpage <= props.lastPage && (
                <Pagination key={idx + props.startpage} id={String(idx + props.startpage)} onClick={props.onClickPage}> {idx + props.startpage} </Pagination>
              )
            );
          })
        }
        <NextBtn onClick={props.onClickNextPage}>다음페이지</NextBtn>
      </div>
    </>
  );
}