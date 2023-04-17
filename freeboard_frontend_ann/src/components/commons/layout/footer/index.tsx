import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 80px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LayoutFooter() {
  return (
    <>
      <Wrapper>Copyright ⓒ 2023 designed by THEAHN</Wrapper>
    </>
  );
}