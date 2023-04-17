// 개발자일때 => 즉 ex) 디스코드(개발자)

import axios from "axios";

export default function OpengraphDeveloperPage() {

  const onClickEnter = async () => {
    // 1. 채팅데이터에 주소가 있는지 찾기(ex, https://.. 로 시작하는것)

    // 2. 해당 주소로 스크래핑하기
    const result = await axios.get('https://www.programmers.co.kr'); // CORS: https://www.naver.com
    console.log(result.data);

    // 3. 매타태그에서 오픈그래프(og:) 찾기
    console.log(result.data.split('<meta').filter((el: string) => el.includes('og:')));
  }
  
  return (
    <>
      <button onClick={onClickEnter}>채팅입력 후 엔터치기!!</button>
    </>
  );
}