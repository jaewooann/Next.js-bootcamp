import { Wrapper } from "./FirebaseWrite.styles";
import type { IFirebaseWriteUIProps } from "./FirebaseWrite.types";

export default function FirebaseWriteUI(props: IFirebaseWriteUIProps) {

  return (
    <>
      <Wrapper>
        <div>
          <div>
            작성자: <input type="text" onChange={props.onChangeWriter} />
          </div>
          <div>
            제목: <input type="text" onChange={props.onChangeTitle} />
          </div>
          <div>
            내용: <input type="text" onChange={props.onChangeContents} />
          </div>
          <div>
            <button onClick={props.onClickSubmit}>등록하기</button>
          </div>
        </div>
      </Wrapper>
    </>
  );
}