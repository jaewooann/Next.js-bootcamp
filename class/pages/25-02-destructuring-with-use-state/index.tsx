import { useState } from 'react';

export default function CounterStatePage() {
  const result = useState(0);

  function onClickCountUp() {
    // setCount(2);
    // setCount(3);
    // setCount(4);
    // setCount(5);
    // setCount(6);
    result[1](6);
  }

  return (
    <>
      <div>{result[0]}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
    </>
  );

}