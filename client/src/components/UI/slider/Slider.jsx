import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { ArrowCircleRight2, ArrowCircleLeft2 } from 'iconsax-react'
import classes from './Slider.module.css'

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <section className={classes.slider}>
            <ArrowCircleLeft2
                size="36"
                color="#555555"
                className={classes.left_arrow}
                onClick={prevSlide}
            />
            <ArrowCircleRight2
                size="36"
                color="#555555"
                className={classes.right_arrow}
                onClick={nextSlide}
            />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? [classes.slide, classes.active].join(' ') : classes.slide}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className={classes.image} />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;