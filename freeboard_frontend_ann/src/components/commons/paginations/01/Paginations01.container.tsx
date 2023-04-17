import { useState } from "react";
import Paginations01UI from "./Paginations01.presenter";
import type { MouseEvent } from 'react';
import type { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props) {
  const [startpage, setStartpage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = (props.count !== undefined) && Math.ceil(Number(props.count) / 10);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    const activedPage = Number(e.currentTarget.id);
    setActivedPage(activedPage);
    void props.refetch({ page: activedPage });
  }

  const onClickPrevBtn = () => {
    if(startpage === 1) return;
    setStartpage(startpage - 10);
    setActivedPage(startpage - 10);
    void props.refetch({ page: startpage - 10 });
  }
  const onClickNextBtn = () => {
    if((startpage + 10) <= lastPage) {
      setStartpage(startpage + 10);
      setActivedPage(startpage + 10);
      void props.refetch({ page: startpage + 10 });
    }
  }

  return (
    <>
      <Paginations01UI 
        startpage={startpage}
        lastPage={lastPage}
        activedPage={activedPage}
        onClickPage={onClickPage}
        onClickPrevBtn={onClickPrevBtn}
        onClickNextBtn={onClickNextBtn}  
    />
    </>
  );
}