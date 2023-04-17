import * as S from "./BoardWrite.styles";
import type { IBoardWriteUIProps } from "./BoardWrite.types";
import { Modal } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import UploadFile from "../../../commons/uploads/01/UploadFile.container";
import { uuidv4 } from "@firebase/util";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  
  return (
    <S.Wrapper>
      <S.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</S.Title>
      <S.WriterWrapper>
        <S.InputWrapper>
          <S.Label>작성자</S.Label>
          <S.Writer type="text" placeholder="이름을 적어주세요." defaultValue={props.data?.fetchBoard.writer ?? ''} onChange={props.onChangeWriter} />
          <S.Error>{props.writerError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>비밀번호</S.Label>
          <S.Password type="password" placeholder="비밀번호를 작성해주세요." onChange={props.onChangePassword} />
          <S.Error>{props.passwordError}</S.Error>
        </S.InputWrapper>
      </S.WriterWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject type="text" placeholder="제목을 작성해주세요." defaultValue={props.data?.fetchBoard.title} onChange={props.onChangeTitle} />
        <S.Error>{props.titleError}</S.Error>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.Contents placeholder="내용을 작성해주세요." defaultValue={props.data?.fetchBoard.contents} onChange={props.onChangeContents} />
        <S.Error>{props.contentsError}</S.Error>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>주소</S.Label>
        <S.ZipcodeWrapper>
          <S.Zipcode placeholder="07250" value={props.zipcode || (props.data?.fetchBoard.boardAddress?.zipcode ?? '')} disabled />
          {/* <S.SearchButton>우편번호 검색</S.SearchButton> */}
          <S.SearchButton onClick={props.onToggleModal}>
            우편번호 검색
          </S.SearchButton>
          {
            props.isModalOpen && 
            <Modal title="우편번호 검색" open={true} onOk={props.onToggleModal} onCancel={props.onToggleModal}>
              <DaumPostcodeEmbed onComplete={props.handleComplete} />
            </Modal>
          }
        </S.ZipcodeWrapper>
        <S.Address value={props.roadAddress || (props.data?.fetchBoard.boardAddress?.address ?? '')} disabled />
        <S.Address onChange={props.onChangeEtcAddress} defaultValue={props.data?.fetchBoard.boardAddress?.addressDetail ?? ''} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>유튜브</S.Label>
        <S.Youtube placeholder="링크를 입력해주세요." defaultValue={props.data?.fetchBoard?.youtubeUrl ?? ''} onChange={props.onChangeYoutubeUrl} />
      </S.InputWrapper>
      <S.ImageWrapper>
        <S.Label>사진첨부</S.Label>
        <div style={{display: 'flex'}}>
          {props.fileUrls.map((el, idx) => {
            return (
              <UploadFile
                key={uuidv4()}
                idx={idx}
                fileUrl={el}
                onChangeFileUrls={props.onChangeFileUrls}
              />
            )
          })}
        </div>
      </S.ImageWrapper>
      <S.OptionWrapper>
        <S.Label>메인설정</S.Label>
        <S.RadioButton type="radio" id="youtube" name="radio-button" />
        <S.RadioLabel htmlFor="youtube">유튜브</S.RadioLabel>
        <S.RadioButton type="radio" id="image" name="radio-button" />
        <S.RadioLabel htmlFor="image">사진</S.RadioLabel>
      </S.OptionWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton isActive={props.isEdit ? true : props.isActive} onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>{props.isEdit ? "수정하기" :  "등록하기"}</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}