import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1em 0;
`;

export const PrevNextBtn = styled.span`
  cursor: pointer;
`;

interface IPaginationProps {
  isActive: boolean;
}
export const Pagination = styled.span`
  margin: 0 1em;
  cursor: ${(props: IPaginationProps) => {
    return (
      props.isActive ? 'normal' : 'pointer'
    );
  }};
  font-weight: ${(props: IPaginationProps) => {
    return (
      props.isActive ? 'bold' : 'normal'
    );
  }};
`;