interface IProps {
  title: string;
  isActive: boolean;
}

export default function Button01(props: IProps) {
  return (
    <button style={{backgroundColor: props.isActive ? 'yellow' : ''}}>
      {props.title}
    </button>
  );
}