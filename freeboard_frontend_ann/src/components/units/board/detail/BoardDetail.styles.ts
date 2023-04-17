import { DislikeOutlined, LikeFilled } from '@ant-design/icons/lib/icons';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
width: 1200px;
margin: 3em auto 2em;
`;

export const BoardDeatilWrap = styled.div`
padding: 3em;
border: none;
box-shadow: 0px 0px 10px gray;
box-sizing: border-box;
`;

export const Header = styled.div`
  border-bottom: 1px solid #bdbdbd;
  padding: 1em 0;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Avatar = styled.img`
  width: 5%;
  height: 5%;
`;

export const Info = styled.div`
  margin-left: 0.4em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Writer = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
`;

export const CreatedAt = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #828282;
`;

export const AddressArea = styled.div`
  color: #828282;
  span {
    margin-left: 1em;
  }
`;

export const BoardDeatilBottom = styled.div`
  height: 500px;
`;

export const BoardLikeArea = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoardLikeCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;

export const LikeIcon = styled(LikeFilled)`
  font-size: 25px;
`;

export const DisLikeIcon = styled(DislikeOutlined)`
  font-size: 25px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
`;

export const Contents = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const ImgWrapper = styled.div`
  display: flex;
  width: 250px;
  height: 250px;
  object-fit: contain;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  margin: 3em 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  border: 1px solid #000;
  padding: 10px 40px;
  margin: 0 1em;
  cursor: pointer;
  font-size: 12px;
  background: #fff;
  transition: all .3s;
  &:hover {
    background: #c6c6c6;
  }
`;