import React from 'react';
// import styles from './index.less';
// import Slider from 'rayslider';
import Slider from '@raydata/slider';
import './slick.less';

const config = {
    // adaptiveHeight: true,
    // vertical: true,
    // verticalSwiping: true,
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // speed: 1000,
    // autoplay: true,
    // accessibility: false,
    // arrows: false,
    // infinite: true,
    // draggable: false,
    // pauseOnHover: false,
    // autoplaySpeed: 2000,
    // rtl: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    arrows: false,
    adaptiveHeight: true,
    draggable: false,
    pauseOnHover: false,
    rows: 3,
    speed: 10000,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: false,
    infinite: true,
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
            <div>2222222222222222222222222222222222222222222222222222</div>
        </div>
    );
}
