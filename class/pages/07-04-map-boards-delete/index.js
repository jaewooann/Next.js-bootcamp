import { gql, useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards{
      number
      writer
      title
      contents
    }
  }
`;
const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(
      number: $number
    ){
      _id
      number
      message
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 20%;
  border: 1px solid #000;
`;

export default function StaticRoutedPage() {
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data } = useQuery(FETCH_BOARDS);
  
  console.log(data?.fetchBoards);

  const onClickDelete = async (e) => {
    await deleteBoard({
      variables: {
        number: Number(e.target.id)
      },
      refetchQueries: [{query: FETCH_BOARDS}]
    });
  }

    return (
      <>
        {data?.fetchBoards.map((el) => (
          <Row key={el.number}>
            <Column><input type="checkbox" /></Column>
            <Column>{el.number}</Column>
            <Column>{el.title}</Column>
            <Column>{el.contents}</Column>
            <Column>
              <button id={el.number} onClick={onClickDelete} type="button">삭제</button>
            </Column>
          </Row>
        )
      )}
      </>
  );
}