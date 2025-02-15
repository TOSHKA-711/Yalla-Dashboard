import React from "react";
import "./ImagesSlider.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImagesSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // autoplay={{ delay: 3000 }}
      // loop={true}
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx}>
          <img src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagesSlider;
