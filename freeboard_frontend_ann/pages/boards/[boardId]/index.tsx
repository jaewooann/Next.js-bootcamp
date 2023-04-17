import BoardDetail from '../../../src/components/units/board/detail/BoardDetail.container';
import CommentList from '../../../src/components/units/Comment/list/CommentList.container';
import CommentWrite from '../../../src/components/units/Comment/write/CommentWrite.container';
// import BoardCommentList from '../../../src/components/units/boardComment/list/BoardCommentList.container';
// import BoardCommentWrite from '../../../src/components/units/boardComment/write/BoardCommentWrite.container';


export default function BoardDetailPage() {

  return (
    <>
      <BoardDetail />
      {/* <BoardCommentWrite /> */}
      {/* <BoardCommentList /> */}
      <CommentWrite />
      <CommentList />
    </>
  );
}