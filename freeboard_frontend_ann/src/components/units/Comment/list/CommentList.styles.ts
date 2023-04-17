import styled from '@emotion/styled';
import { Rate } from 'antd';

export const Wrapper = styled.div`
  width: 1200px;
  margin: 2em auto;
  border-bottom: 1px solid #c6c6c6;
  padding: 1em;
`;

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FlexWriter = styled.div`
  display: flex;
  width: 85%;
`;

export const Avatar = styled.img`
  margin-right: 1em;
  display: block;
  width: 3%;
  height: 3%;
`;

export const Writer = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

export const Contents = styled.div`
  font-size: 14px;
`;

export const Star = styled(Rate)`
  padding-left: 1em;
`;

export const EditWrap = styled.div`
  display: flex;
`;

export const EditBtn = styled.div`
  border: 1px solid #000;
  padding: 0.4em;
  cursor: pointer;
`;

export const DeleteBtn = styled.div`
  background: #000;
  border: 1px solid #000;
  color: #fff;
  margin-left: 0.4em;
  padding: 0.4em;
  cursor: pointer;
`;

export const DateWrap = styled.div`
  margin-top: 1em;
  padding-left: 3em;
`;

export const Date = styled.div`
  font-size: 13px;
`;