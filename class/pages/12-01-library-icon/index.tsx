import { PlayCircleOutlined } from "@ant-design/icons";
import styled from '@emotion/styled';

const MyIcon = styled(PlayCircleOutlined)`
  color: red;
  font-size: 50px;
  cursor: pointer;
`;

export default function LibraryIconPage() {

  return (
    <>
      <MyIcon />
    </>
  );
}