import { Pagination, PaginationWrapper, PrevNextBtn } from "./Paginations01.styles";
import type { IPaginations01UIProps } from "./Paginations01.types";

export default function Paginations01UI(props: IPaginations01UIProps) {
  return (
    <>
      <PaginationWrapper>
        <PrevNextBtn onClick={props.onClickPrevBtn}> {`<`} </PrevNextBtn>
          {new Array(10).fill(1).map((_, idx) => {
            return (idx + props.startpage <= props.lastPage) && (
              <Pagination
                id={String(idx + props.startpage)} 
                key={idx + props.startpage} 
                onClick={props.onClickPage}
                isActive={idx + props.startpage === props.activedPage}
                >
                  {idx + props.startpage}
                </Pagination>
            );
          })}
        <PrevNextBtn onClick={props.onClickNextBtn}> {`>`} </PrevNextBtn>
      </PaginationWrapper>
    </>
  );
}