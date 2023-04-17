import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
  width: 800px;
  height: calc(100vh - 140px);
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.h2`
  margin-bottom: 0.6em;
`;

export const InputWrap = styled.div`
  width: 350px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1em;
  margin: 0.4em 0;
`;

export const InputErrorMsg = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 0.4em;
`;

interface IProps {
  isValid: boolean;
}
export const Button = styled.button`
  width: 100%;
  padding: 1em;
  background: ${(props: IProps) => props.isValid ? 'purple' : ''};
  border: ${(props: IProps) => props.isValid ? 'none' : ''};
  cursor: ${(props: IProps) => props.isValid ? 'pointer' : ''};
  color: ${(props: IProps) => props.isValid ? 'white' : ''};
`;