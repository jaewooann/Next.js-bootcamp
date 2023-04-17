import CommentListItem from "./CommentList.presenteritem";
import type { ICommentListUIProps } from "./CommentList.types";
// import InfiniteScroll from 'react-infinite-scroller';

export default function CommentListUI(props: ICommentListUIProps) {
  
  if(!props.data) return <div></div>;
  return (
    // <Wrapper
    //   pageStart={0}
    //   loadMore={props.onLoadMore}
    //   hasMore={true}
    // >
    <>
      {props.data?.fetchBoardComments.map((el, idx) => {
        return (
            <CommentListItem 
              key={idx} 
              el={el}
              onClickWriter={props.onClickWriter}
              onClickDelete={props.onClickDelete}
            />
        );
      })}
    </>
    // </Wrapper>
  );
}