import { withAuth } from "../../src/components/commons/hocs/withAuth";

function MyProfilePage() {

  return (
    <>
      마이프로필 페이지 입니다.
    </>
  );
}

export default withAuth(MyProfilePage);