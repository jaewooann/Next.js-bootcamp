import { useForm } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };

  console.log('리렌더링 되나요?');

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register('writer')} /><br />
      제목: <input type="text" {...register('title')} /><br />
      내용: <input type="text" {...register('contents')} /><br />
      {/* 주소: <input type="text" {...register('boardAddress.addressDetail')} /><br /> */}
      <button>등록하기</button>
    </form>
  );
}

/*
  <button type="button">나만의버튼</button>
  <button type="submit">보내기</button> // 기본값
  <button type="reset">지우기</button>
*/