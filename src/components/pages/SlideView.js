import React from "react";
import styled from "styled-components";
import Slider from 'react-slick'
import stark from '../icons/stark.png'
import lannister from '../icons/lannister.png'
import mallister from '../icons/mallister.png'
import baratheon from '../icons/baratheon.png'
import blackwood from '../icons/blackwood.png'
import bracken from '../icons/bracken.png'

const Wrapper =styled.div`
    width:100%;
    `;

const Page =styled.div`
    width:100%;
    `;

export default class SlideView extends React.Component{
    render() {
        return(
            <div  id="slide" >
            <Slider speed={1000} SlidesToShow={1} slidesPerRow={2} SlidesToScroll={1} infinite={true } arrows={false} autoplay={true}>
                <img src={stark} ></img>
                <img src={lannister}></img>
                <img src={baratheon}></img>
                <img src={blackwood}></img>
                <img src={bracken}></img>
                <img src={mallister}></img>
            </Slider>
            </div>
        )
    }
}