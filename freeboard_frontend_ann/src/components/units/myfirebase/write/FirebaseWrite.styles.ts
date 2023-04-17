import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;