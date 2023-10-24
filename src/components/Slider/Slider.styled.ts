import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const StyledBox = styled.div`
  height: 90vh;
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 90vh;
  --swiper-pagination-color: #ffffff;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #615f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90vh;
`;

export const StyledSliderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  position: absolute;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const StyledIFrame = styled.iframe`
  transform: scale(1.5);
`;

export const StyledSliderDescription = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: 500;
  text-align: start;
`;

export const StyledImg = styled.img`
  width: 100%;
`