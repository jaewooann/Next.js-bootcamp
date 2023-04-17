import { useState } from 'react';

export default function SignupStatePage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('')

  function onChangeEmail(event) {
    // console.log(event); // 나의 행동
    // console.log(event.target); // 작동된 태그
    // console.log(event.target.value); // 작동된 태그에 입력된 값
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickSignup() {
    // 진짜 포장이 잘 됐는지 확인해보기
    // console.log(email);
    // console.log(password);

    // 검증하기
    if(email.includes('@') === false) {
      // alert('이메일이 올바르지 않습니다!! @가 없음!!');
      // document.getElementById('error').innerText = '이메일이 올바르지 않습니다!! @가 없음!!';
      setEmailError('이메일이 올바르지 않습니다!! @가 없음!!');
    } else {
      // 메세지 알림 이전, Backend 컴퓨터에 있는 API(함수) 요청하기
      alert('회원가입을 축하합니다!!');
    }
  }

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} />
      {/* <div id='error' style={{fontSize: '10px', color: 'red'}}></div> */}
      <div style={{fontSize: '10px', color: 'red'}}>{emailError}</div>
      비밀번호: <input type="password" onChange={onChangePassword} />
      <button type="button" onClick={onClickSignup}>회원가입</button>
    </>
  );

}