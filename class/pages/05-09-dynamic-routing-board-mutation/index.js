import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) { # 변수의 타입 적는 곳
    createBoard( # 실제 우리가 전달할 변수 적는 곳
      writer: $writer,
      title: $title,
      contents: $contents
    ){
      _id
      number
      message
    }
  }
`

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    try {
      // const writer = 'qqq'; // 스코프 체인
      const result = await createBoard({
        variables: { // variables 이게 $ 역할을 해줌
          writer: writer,
          title: title,
          contents: contents
        }
      });
      console.log(result);
      alert(result.data.createBoard.message);
      console.log(result.data.createBoard.number);
      // router.push('/05-10-dynamic-routed-board-mutation/' + result.data.createBoard.number); // 매번 더하기 귀찮음
      router.push(`/05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`); // 위에 더하기를 생략한 것과 같음 (템플릿 리터럴)
    } catch(error) {
      // try에 있는 내용을 시도하다가 실패하면, 아랫줄 모두 무시!!! 하고 catch가 실행됨.
      console.log(error.message);
      alert(error.message);
    }
  }

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e) => {
    setContents(e.target.value);
  }

  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} /><br />
      제목: <input type="text" onChange={onChangeTitle} /><br />
      내용: <input type="text" onChange={onChangeContents} /><br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}