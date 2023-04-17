import styled from '@emotion/styled';
import type { IQuery } from '../../../commons/types/generated/types';

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 25%;
  border: 1px solid #000;
`;

interface IChild1Props {
  data?: Pick<IQuery, 'fetchBoards'>;
}
export default function Child1(props: IChild1Props) {

  return (
    <>
      {props.data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column style={{margin: '10px'}}>{el.writer}</Column>
          <Column style={{margin: '10px'}}>{el.title}</Column>
        </Row>
      )
      )}
    </>
  );
}