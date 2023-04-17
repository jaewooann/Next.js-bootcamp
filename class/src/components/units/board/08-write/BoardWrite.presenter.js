import { BlueButton, RedInput } from "./BoardWrite.styles";


export default function BoardWriteUI(props) {
  
  // 자바스크립트 영역

  // HTML 영역(return 아래)
  return (
    <>
      작성자: <RedInput type="text" onChange={props.onChangeWriter} /><br />
      제목: <input type="text" onChange={props.onChangeTitle} /><br />
      내용: <input type="text" onChange={props.onChangeContents} /><br />
      <BlueButton 
        aaa="20px"
        qqq="yellow"
        zzz={props.mycolor}
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
      >
        {props.isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
    </>
  );
}