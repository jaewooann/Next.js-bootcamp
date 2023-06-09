import { GraphQLClient, gql } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    const graphqQLClient = new GraphQLClient('https://backend-practice.codebootcamp.co.kr/graphql',
      { credentials: 'include' }
    );
    const result = await graphqQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch(error) {
    if (error instanceof Error) console.log(error.message);
  }
}