// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useForm } from 'react-hook-form';

const ReactQuill = dynamic(async() => await import('react-quill'), {ssr: false});

export default function WebEditorPage() {
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: 'onChange'
  });

  // ReactQuill 만든 사람들이 만든 onChange 이므로 event 안들어옴
  const onChangeContents = (value: string) => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능!!
    setValue('contents', value === '<p><br></p>' ? "" : value);
    
    // onChange 됐다고 react-hook-form에 강제로 알려주는 기능!!
    void trigger('contents');
  }

  const onClickSubmit = async () => {
    const { Modal } = await import('antd'); // code-splitting(코드스플릿팅)
    Modal.success({ content: 'aa' });
  }

  return (
    <div>
      작성자: <input type="text" {...register('writer')} />
      <br />
      비밀번호: <input type="password" {...register('password')} />
      <br />
      제목: <input type="text" {...register('title')} />
      <br />
      내용: <ReactQuill onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}