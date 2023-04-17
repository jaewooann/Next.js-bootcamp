import BoardWrite from "../../../src/components/units/board/10-write/BoardWrite.container";

export default function GraphqlMutationPage() {

  return (
    // <> 원래 원리가 이것이다. 함수의 호출(안에 객체를 넣었다)
    //   {BoardWrite({ isEdit: false })}
    // </>
    <BoardWrite isEdit={false} />
  );
}