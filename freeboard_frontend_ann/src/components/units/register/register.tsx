import { useForm } from 'react-hook-form';
import * as S from './register.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from '@apollo/client';
import type { IMutation, IMutationCreateUserArgs } from '../../../commons/types/generated/types';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

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

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(
      createUserInput: $createUserInput
    ){
      _id
      email
      name
    }
  }
`;

interface IRegisterFormData {
  email: string;
  password: string;
  name: string;
}

export default function Register() {
  const router = useRouter();
  const [createUser] = useMutation<Pick<IMutation, 'createUser'>, IMutationCreateUserArgs>(CREATE_USER);
  const { register, handleSubmit } = useForm<IRegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onClickRegister = async (data: IRegisterFormData) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      Modal.success({ content: '회원가입이 완료되었습니다.' });
      void router.push('/login');
    } catch(error) {
      if(error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <S.RegisterWrapper>
      <S.RegisterTitle>회원가입</S.RegisterTitle>
      <form onSubmit={handleSubmit(onClickRegister)}>
        <S.InputWrap>
          <S.Input type="text" placeholder='이메일을 입력해주세요' {...register('email')}/>
        </S.InputWrap>
        <S.InputWrap>
          <S.Input type="password" placeholder='비밀번호를 입력해주세요' {...register('password')}/>
        </S.InputWrap>
        <S.InputWrap>
          <S.Input type="text" placeholder='이름을 입력해주세요' {...register('name')}/>
        </S.InputWrap>
        <S.Button>회원가입하기</S.Button>
      </form>
    </S.RegisterWrapper>
  );
}