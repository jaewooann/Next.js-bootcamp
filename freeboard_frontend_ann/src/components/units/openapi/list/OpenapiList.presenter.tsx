import { DogImg, Wrapper } from './OpenapiList.styles';
import type { IOpenapiListUIProps } from './OpenapiList.types';

export default function OpenapiListUI(props: IOpenapiListUIProps) {

  return (
    <>
      <Wrapper>
        <div>
          {props.imgUrls.map((el, idx) => {
            return (
              <>
                <DogImg key={el} src={el} />
                {/* {(idx + 1) % 3 === 0 && <br />} */}
              </>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
}