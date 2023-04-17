// import { gql, useMutation } from "@apollo/client";

// const CREATE_BOARD = gql`
//   mutation creatBoard($writer: String, $title: String, $contents: String) { # 변수의 타입적는 곳
//     createBoard( # 실제 우리가 전달할 변수 적는 곳
//       writer: $writer,
//       title: $title,
//       contents: $contents
//     ){
//       _id
//       number
//       message
//     }
//   }
// `

// export default function GraphqlMutationPage() {
//   const [createBoard] = useMutation(CREATE_BOARD);

//   const onClickSubmit = async () => {
//     const result = await createBoard({
//       variables: { // variables 이게 $ 역할을 해줌
//         writer: "훈이",
//         title: "안녕하세요!!",
//         contents: "반갑습니다!!"
//       }
//     });
//     alert(result.data.createBoard.message);
//   }

//   return (
//     <>
//       <button onClick={onClickSubmit} type="button">GRAPHQL-API(동기) 요청하기</button>
//     </>
//   );
// }

import { gql, useMutation } from '@apollo/client';

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
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: { // variables 이게 $ 역할을 해줌
        writer: "훈이",
        title: "안녕하세요!!",
        contents: "반갑습니다!!"
      }
    });
    console.log(result);
    alert(result.data.createBoard.message);
  }

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}