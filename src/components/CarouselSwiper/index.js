import styles from "./Carousel.module.css";
import Card from "components/Card";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
register();

function CarouselSwiper({ videos, cor }) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    // Object with parameters
    const params = {
      slidesPerView: 3,
      breakpoints: {
        450:{
          slidesPerView: 2,
        },
        960:{
          slidesPerView: 3
        }
      },
    };

    // Assign it to swiper element
    Object.assign(swiperElRef.current, params);

    // initialize swiper
    swiperElRef.current.initialize();
  }, []);

  return (
    <swiper-container
      class={styles.swiperContainer}
      ref={swiperElRef}
      pagination="true"
      navigation="true"
      space-between="30"
    >
      {videos.map((video) => {
        return (
          <swiper-slide key={video.id} class={styles.swiperSlide}>
            <Card cor={cor} {...video} key={video.id}/>
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

export default CarouselSwiper;
