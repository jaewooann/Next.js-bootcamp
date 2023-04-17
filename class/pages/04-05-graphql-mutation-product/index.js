// import { useState } from 'react';
// import { gql, useMutation } from "@apollo/client";

// const CREATE_PRODUCT = gql`
//   mutation createProduct($seller: String, $createProductInput: CreateProductInput!) { # 변수의 타입적는 곳
//     createProduct( # 실제 우리가 전달할 변수 적는 곳
//       seller: $seller,
//       createProductInput: $createProductInput
//     ){
//       _id
//       number
//       message
//     }
//   }
// `

// export default function GraphqlMutationPage() {
//   const [seller, setSeller] = useState('');
//   const [name, setName] = useState('');
//   const [detail, setDetail] = useState('');
//   const [price, setPrice] = useState('');

//   const [createProduct] = useMutation(CREATE_PRODUCT);

//   const onClickSubmit = async () => {
//     // const writer = 'qqq'; // 여기에 있으면 현재 스코프
//     const result = await createProduct({
//       variables: { // variables 이게 $ 역할을 해줌
//         seller: seller,
//         createProductInput: {
//           name: name,
//           detail: detail,
//           price: price
//         } 
//       }
//     });
//     console.log(result);
//     alert(result.data.createProduct.message);
//   }

//   const onChangeSeller = (e) => {
//     setSeller(e.target.value);
//   }

//   const onChangeName = (e) => {
//     setName(e.target.value);
//   }

//   const onChangeDetail = (e) => {
//     setDetail(e.target.value);
//   }

//   const onChangePrice = (e) => {
//     setPrice(Number(e.target.value));
//   }

//   return (
//     <>
//       판매자: <input type="text" onChange={onChangeSeller} /><br />
//       이름: <input type="text" onChange={onChangeName} /><br />
//       디테일: <input type="text" onChange={onChangeDetail} /><br />
//       가격: <input type="number" onChange={onChangePrice} /><br />
//       <button onClick={onClickSubmit} type="button">GRAPHQL-API(동기) 요청하기</button>
//     </>
//   );
// }

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_PRODUCT = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) { # 변수의 타입 적는 곳
    createProduct( # 실제 우리가 전달할 변수 적는 곳
      seller: $seller,
      createProductInput: $createProductInput
    ){
      _id
      number
      message
    }
  }
`

export default function GraphqlMutationPage() {
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    // const writer = 'qqq'; // 이 함수에 있으면 현재 스코프
    const result = await createProduct({
      variables: { // variables 이게 $ 역할을 해줌
        seller: "훈이", // 이 함수에 없으면 스코프 체인을 통해서 위 함수에서 찾음
        createProductInput: {
          name: "마우스",
          detail: "정말 좋은 마우스",
          price: 3000
        }
      }
    });
    console.log(result);
    alert(result.data.createProduct.message);
  }

  return <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
}