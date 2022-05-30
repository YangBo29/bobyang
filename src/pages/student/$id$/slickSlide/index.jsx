import React from 'react';
// import styles from './index.less';
import Slider from 'rayslider';
import './slick.less';

const config = {
    adaptiveHeight: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    accessibility: false,
    arrows: false,
    infinite: true,
    draggable: false,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    rtl: true,
};

export default function SlickSlide(props) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Slider {...config}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
            </Slider>
        </div>
    );
}
