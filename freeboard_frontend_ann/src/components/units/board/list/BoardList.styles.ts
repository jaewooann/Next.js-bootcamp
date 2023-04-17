import styled from '@emotion/styled';
import type { ISearchTokenProps } from './BoardList.types';

export const Wrapper = styled.div`
  width: 90%;
  margin: 5em auto 0;
`;

export const TableTop = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  // height: 50px;
`;

export const TableBottom = styled.div`
  line-height: 100px;
  height: 100px;
  text-align: right;
`;

export const Button = styled.button`
  border-radius: 25px;
  padding: 10px 25px;
  cursor: pointer;
  border: 1px solid #c6c6c6;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
`;

export const Column = styled.span`
  width: 25%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  text-align: center;
`;

export const ColumnTitle = styled.span`
  width: 25%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  text-align: center;
`;

export const SearchToken = styled.span`
  color: ${(props: ISearchTokenProps) => (props.isMatched ? 'red' : 'black')}
`;

export const ColumnHeader = styled.span`
  width: 25%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;