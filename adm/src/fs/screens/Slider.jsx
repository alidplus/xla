import React, { useMemo, useState } from 'react'
import {Carousel, CarouselControl, CarouselIndicators, CarouselItem} from "../../../atoms";


const Slider = ({ array = {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const items = useMemo(() => array?.data || [], [array])

  const slides = useMemo(() => {
    return items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
          className="justify-content-center"
        >
          <div className="w-100 ratio ratio-21x9 d-flex justify-content-center">
            <img src={`${process.env.XLA_FS_URL}${item.url}`} className="mx-auto object-fit-cover" />
          </div>
        </CarouselItem>
      );
    });
  }, [items])
  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slider
