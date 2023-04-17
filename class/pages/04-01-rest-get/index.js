import { useState } from 'react';
import axios from 'axios';

export default function RestGetPage() {

  const [title, setTitle] = useState('');

  const onClickAsync = () => {
    const result = axios.get('https://koreanjson.com/posts/1');
    console.log(result);
  }
  const onClickSync = async () => {
    const result = await axios.get('https://koreanjson.com/posts/1');
    console.log(result);
    console.log(result.data);
    console.log(result.data.title);
    setTitle(result.data.title);
  }


  return (
    <>
      <button onClick={onClickAsync} type="button">REST-API(비동기) 요청하기</button>
      <button onClick={onClickSync} type="button">REST-API(동기) 요청하기</button>
      <div>{title}</div>
    </>
  );
}