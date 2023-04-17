interface IProps {
  count: number;
  onClickCountUp: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Child1(props: IProps) {

  // 부모의 state 조작 방법 - 2
  const onClick = () => {
    props.setCount((prev) => prev + 1);
  }

  return (
    <>
      <div>자식1의 카운트: {props.count}</div>
      <button onClick={onClick}>카운트 올리기!!!</button>
    </>
  );
}