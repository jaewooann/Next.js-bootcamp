import { useForm } from "react-hook-form";
import * as S  from "./login.styles";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ILoginFormData } from "./login.types";
import { gql, useMutation } from "@apollo/client";
import type { IMutation, IMutationLoginUserArgs } from "../../../commons/types/generated/types";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";
import { useRouter } from "next/router";

const schema = yup.object({
  email: yup
    .string()
    .email('이메일 형식에 적합하지 않습니다.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .min(4, '비밀번호는 최소 4자리 이상 입력해주세요.')
    .max(15, '비밀번호는 최대 15자리로 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
});

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(
      email: $email
      password: $password
    ){
      accessToken
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [loginUser] = useMutation<Pick<IMutation, 'loginUser'>, IMutationLoginUserArgs>(LOGIN_USER);
  const { register, handleSubmit, formState } = useForm<ILoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onClickSubmit = async (data: ILoginFormData) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      if(!accessToken) {
        Modal.error({ content: '로그인에 실패했습니다. 다시 시도해주세요.' });
        return;
      }
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);

      void router.push('/');

    } catch(error) {
      if(error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <S.LoginWrapper>
        <S.LoginTitle>로그인</S.LoginTitle>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <S.InputWrap>
            <S.Input type="text" placeholder='이메일을 입력해주세요' {...register('email')} />
            <S.InputErrorMsg>{formState.errors.email?.message}</S.InputErrorMsg>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input type="password" placeholder='비밀번호를 입력해주세요' {...register('password')} />
            <S.InputErrorMsg>{formState.errors.password?.message}</S.InputErrorMsg>
          </S.InputWrap>
          <S.Button isValid={formState.isValid} >로그인하기</S.Button>
        </form>
    </S.LoginWrapper>
  );
}