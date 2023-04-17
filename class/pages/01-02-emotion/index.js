import { Email, EmailInput, EmailImg } from '../../styles/emotion';

export default function EmotionPage() {

  // 여기는 자바스크립트 쓰는 곳

  // ---------------------------

  return (
    <div>
      <Email>이메일</Email>
      <EmailInput type="text" />
      <button>클릭하세요!!</button>
      <EmailImg src='/vercel.svg' />
    </div>
  )
}