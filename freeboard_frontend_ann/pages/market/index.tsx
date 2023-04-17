import { withAuth } from "../../src/components/commons/hocs/withAuth";

function MarketPage() {

  return (
    <>
      중고마켓 페이지입니다.
    </>
  );
}

export default withAuth(MarketPage);