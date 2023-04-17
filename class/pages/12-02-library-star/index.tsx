import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Rate } from 'antd';

const MyStar = styled(Rate)`
  font-size: 50px;
  color: red;
`;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default function LibraryStarPage() {
  const [value, setValue] = useState(3);

  return (
    <>
      <MyStar tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </>
  );
}