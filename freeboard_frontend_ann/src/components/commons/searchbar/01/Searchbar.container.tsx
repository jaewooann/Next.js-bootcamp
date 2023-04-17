import type { ChangeEvent } from "react";
import _ from 'lodash';
import SearchBarUI from "./Searchbar.presenter";
import type { ISearchBarProps } from "./Searchbar.types";

export default function SearchBar(props: ISearchBarProps) {

  const getDebounce = _.debounce((value) => {
    void props.refetch({ search: value, page: 1 });
    void props.refetchBoardsCount({ search: value });
    props.onChangeKeyword(value);
  }, 500);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  }

  return (
    <>
      <SearchBarUI
        onChangeSearch={onChangeSearch}
      />
    </>
  );
}