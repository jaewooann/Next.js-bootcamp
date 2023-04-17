import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import type { IQuery, IQueryFetchBoardsArgs } from '../../src/commons/types/generated/types';
import InfiniteScroll from 'react-infinite-scroller';

const FETCH_BOARDS = gql`
  query fetchBoards ($page: Int) {
    fetchBoards (page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 25%;
  border: 1px solid #000;
`;

export default function StaticRoutedPage() {
  const { data, fetchMore } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);

  const onLoadMore = () => {
    if(data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards]
          };
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards]
        };
      },
    });
  }

    return (
      <InfiniteScroll 
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
      >
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column style={{margin: '10px'}}>{el.writer}</Column>
            <Column style={{margin: '10px'}}>{el.title}</Column>
          </Row>
        )) ?? <div></div>}
      </InfiniteScroll>
  );
}