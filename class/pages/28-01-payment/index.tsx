import Head from 'next/head';

declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage() {

  const onClickPayment = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp62727301"); // 예: imp00000000a

    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay({ // param
      pg: "kcp.nictest04m",
      pay_method: "card", // card, vbank 등
      // merchant_uid: "ORD20180131-0000011", // 중복될 시, 결제 안됨!
      name: "노르웨이 회전 의자",
      amount: 100,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일에서는 결제시, 겔져페이지로 사이트가 이동됨
    }, 
    (rsp: any) => { // callback
      if (rsp.success) {
        // 결제 성공 시 로직,
        console.log(rsp);
        // const paymentDate = new Date(); // 프론트엔드에서 시간을 만드는 것은 안됨!

        // 백엔드에 결제관련 데이터 넘겨주기 => 즉 뮤테이션 실행하기
        // createPointTransactionOfLoading
      } else {
        // 결제 실패 시 로직,
        alert('결제에 실패하였습니다. 다시 시도해 주세요!');
      }
    });
  }

  return (
    <>
      <Head>
        {/* jQuery */}
        <script type='text/javascript' src='https://code.jquery.com/jquery-1.12.4.min.js'></script>
        {/* iamport.payment.js */}
        <script type='text/javascript' src='https://cdn.iamport.kr/js/iamport.payment-1.2.0.js'></script>
      </Head>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}