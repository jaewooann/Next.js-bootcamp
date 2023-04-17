import { useRouter } from "next/router";

export default function BoardsPage() {
  const router = useRouter();

  return (
    <div>
      안녕하세요 게시판입니다~ 동적페이지에요!<br />
      게시글아이디: {router.query.boardId}
    </div>
  );
}