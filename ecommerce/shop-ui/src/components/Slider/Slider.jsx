import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import './Slider.scss';

import { sliderItems } from '../../data';

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };
    return (
        <div className="slider">
            <div className="arrow" onClick={() => handleClick('left')}>
                <ArrowLeftOutlined />
            </div>
            <div className="arrow" onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </div>
            <div
                className="wrapper"
                slideindex={slideIndex}
                style={{ transform: 'translateX(' + slideIndex * -100 + 'vw)' }}
            >
                {sliderItems.map((item) => (
                    <a href="# " className="sliderList" key={item.id}>
                        <div className="imgContainer">
                            <img src={item.img} alt="" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Slider;
