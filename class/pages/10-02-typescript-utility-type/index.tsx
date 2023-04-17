export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string
    age: number
    school: string
    hobby?: string
  }

  type IProfile2 = {
    name: string
    age: number
    school: string
    hobby?: string
  }

  // 1. Pick 타입
  // IProfile 에서 name과 age만 뽑아서 aaa타입에 넣어준다.
  type aaa = Pick<IProfile, "name" | "age">

  // 2. Omit 타입
  // IProfile 에서 school만 빼고 bbb타입에 넣어준다.
  type bbb = Omit<IProfile, "school">

  // 3. Partial 타입
  // IProfile에 모든 키에 ?(있어도 되고 없어도 되는)를 붙여준다.
  type ccc = Partial<IProfile>

  // 4. Required 타입
  // IProfile에 모든 키를 전부다 필수로 바꾸어준다.
  type ddd = Required<IProfile>

  // 5. Record 타입
  type eee = "철수" | "영희" | "훈이" // Union 타입
  let child: eee;
  child = "철수"

  type fff = Record<eee, IProfile> // Record 타입

  // ===== (type vs interface) 차이: 선언병합 =====
  // interface는 각각 선언한 것들이 합쳐진다.
  interface IProfile {
    candy: number
  }

  let profile: Partial<IProfile> = {}
  profile.candy = 10;

  return (
    <></>
  );
}