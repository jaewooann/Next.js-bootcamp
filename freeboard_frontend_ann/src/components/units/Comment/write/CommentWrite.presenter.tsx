import { Rate } from 'antd';
import * as S from "./CommentWrite.styles";
import type { ICommentWriteUIProps } from "./CommentWrite.types";

export default function CommentWriteUI(props: ICommentWriteUIProps) {

  return (
    <S.Wrapper>
      <div>
        {props.isEdit ? <span></span> : <S.CommentTitle>댓글</S.CommentTitle>}
      </div>
      <S.InputWrapper>
        <S.Input 
          type="text" 
          placeholder='작성자' 
          onChange={props.onChangeWriter} 
          value={props.writer || (props.el?.writer ?? '')} 
          readOnly={!!props.el?.writer} 
        />
        <S.Input 
          type="password" 
          placeholder="비밀번호" 
          onChange={props.onChangePassword} 
          value={props.password} 
        />
        <Rate onChange={props.setStar} value={props.star} />
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents 
          maxLength={100} 
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 가해자에게 있습니다." 
          onChange={props.onChangeContents} 
          value={props.contents || (props.el?.contents ?? '')} 
        />
      </S.ContentsWrapper>
      <S.ButtonWrapper>
        <p>
          <span>{(props.contents ? props?.contents.length : props.el?.contents.length) || 0}</span>
          <span>/100</span>
        </p>
        {props.isEdit ? 
          (
            <S.ButtonFlex>
              <S.Button id={props.el._id} onClick={props.onClickComplete} >수정하기</S.Button><S.Button onClick={props.onClickCancel}>취소하기</S.Button>
            </S.ButtonFlex>
          ) : <S.Button onClick={props.onClickComment} >등록하기</S.Button> }
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}