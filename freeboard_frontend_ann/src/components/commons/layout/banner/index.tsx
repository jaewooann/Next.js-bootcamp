import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled';

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
`;

const SliderItem = styled.img`
  width: 350px;
  margin: auto;
`;

export default function LayoutBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true
  };

  return (
    <SlideWrapper>
      <StyledSlider {...settings}>
        <div>
          <SliderItem src='images/banner01.png' />
        </div>
        <div>
          <SliderItem src='images/banner01.png' />
        </div>
        <div>
          <SliderItem src='images/banner01.png' />
        </div>
      </StyledSlider>
    </SlideWrapper>
  );
}