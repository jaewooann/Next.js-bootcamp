// 제공자일때 => 즉 ex) 네이버(제공자)

import { gql } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(
      useditemId: $useditemId
    ) {
      _id
      name
      remarks
      images
    }
  }
`;

export default function OpengraphProviderPage(props: any) {
  // const { data } = useQuery<Pick<IQuery, 'fetchUseditem'>, IQueryFetchUseditemArgs>(FETCH_USEDITEM, {
  //   variables: { useditemId: "64327e2eaef9f000281b8a70" },
  // });

  return (
    <> 
      <Head>
        <meta property='og:title' content={props.qqq?.name} />
        <meta property='og:description' content={props.qqq?.remarks} />
        <meta property='og:image' content={props.qqq?.images?.[0]} />
      </Head>
      <div>
        중고마켓 에 오신 것을 환영합니다!(여기는 body이므로, 미리보기 상관없음!!)
      </div>
    </>
  );
}

// 1. getServerSideProps는 존재하는 단어이므로 변경 불가능
// 2. 여기는 서버에서만 실행됨(Webpack 프론트엔드 서버프로그램)
export const getServerSideProps = async () => {
  console.log('여기는 서버입니다.')

  // 1. 여기서 API 요청
  const graphQLClient = new GraphQLClient("https://backend-practice.codebootcamp.co.kr/graphql");
  const result = await graphQLClient.request(FETCH_USEDITEM, {
    useditemId: "64327e2eaef9f000281b8a70",
  });

  // 2. 받은 결과를 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  }

}