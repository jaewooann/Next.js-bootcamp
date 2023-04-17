import { getDate } from '../../../../commons/utils/utils';
import * as S from './BoardDetail.styles';
import type { IBoardDetailUIProps } from './BoardDetail.types';

export default function BoardDetailUI(props: IBoardDetailUIProps) {

  return (
    <S.Wrapper>
      <S.BoardDeatilWrap>
        <S.Header>
          <S.AvatarWrapper>
            <S.Avatar src="/images/Avatar.png" />
            <S.Info>
              <div>
                <S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>
                <S.CreatedAt>Date: {getDate(props.data?.fetchBoard?.createdAt)}</S.CreatedAt>
              </div>
              <S.AddressArea>
                <span>{props.data?.fetchBoard?.boardAddress?.address}</span>
                <span>{props.data?.fetchBoard?.boardAddress?.addressDetail}</span>
              </S.AddressArea>
            </S.Info>
          </S.AvatarWrapper>
        </S.Header>
        <S.BoardDeatilBottom>
          <S.Title>{props.data?.fetchBoard?.title}</S.Title>
          <S.Contents>
            {props.data?.fetchBoard?.contents}<br />
            {props.data?.fetchBoard?.youtubeUrl}
          </S.Contents>
          <S.ImgWrapper>
            {props.data?.fetchBoard?.images?.filter((el) => el).map((el) => {
              return (
                <S.Image
                  key={el}
                  src={`https://storage.googleapis.com/${el}`} />
              )
            })}
          </S.ImgWrapper>
        </S.BoardDeatilBottom>
        <S.BoardLikeArea>
          <S.BoardLikeCont>
            <S.LikeIcon onClick={props.onClickLike} />
            <p>{props.data?.fetchBoard?.likeCount}</p>
          </S.BoardLikeCont>
          <S.BoardLikeCont>
            <S.DisLikeIcon onClick={props.onClickDislike} />
            <p>{props.data?.fetchBoard?.dislikeCount}</p>
          </S.BoardLikeCont>
        </S.BoardLikeArea>
      </S.BoardDeatilWrap>
      <S.ButtonWrapper>
        <S.Button onClick={props.onClickMoveToBoards}>목록으로</S.Button>
        <S.Button onClick={props.onClickMoveToUpdate}>수정하기</S.Button>
        <S.Button id={props.data?.fetchBoard?._id} onClick={props.onClickDelete}>삭제하기</S.Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}