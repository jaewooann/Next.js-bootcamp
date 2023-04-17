import { SearchInput, SearchWrap } from "./Searchbar.styles";
import type { ISearchBarUIProps } from "./Searchbar.types";

export default function SearchBarUI(props: ISearchBarUIProps) {

  return (
    <>
      <SearchWrap>
        <SearchInput type="text" placeholder="검색어를 입력해주세요" onChange={props.onChangeSearch} />
      </SearchWrap>
    </>
  );
}