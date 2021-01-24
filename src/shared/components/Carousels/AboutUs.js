import React from "react";
import { CarouselStyled } from "./AboutUs.styled.js";
import Image from "next/image";
import { LuminousGallery } from "luminous-lightbox";
import HorizontalCarousel from "horizontal_carousel";
import "luminous-lightbox/dist/luminous-basic.css";
import { faAngleLeft } from "@fortawesome/pro-light-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/pro-light-svg-icons/faAngleRight";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
  }
  componentDidMount() {
    /*
     * Popup lightbox
     */
    const options = {
      caption: function (el) {
        if (el && el.dataset && el.dataset.title) {
          return el.dataset.title;
        }
        return "";
      }
    };
    new LuminousGallery(document.querySelectorAll(".slides a"), {}, options);
    /*
     * Mount carousel
     */
    this.carousel = new HorizontalCarousel(this.carouselRef.current);
  }
  componentWillUnmount() {
    /*
     * Unmount carousels
     */
    this.carousel.end();
  }
  render() {
    return (
      <CarouselStyled>
        <div className="horizontal_carousel" ref={this.carouselRef}>
          <div className="slides">
            <a href="/photos/aboutus.jpg">
              <Image height={280} width={280} src="/photos/aboutus.jpg" />
            </a>
            <a href="/photos/desk-paul.jpg">
              <Image height={280} width={280} src="/photos/desk-paul.jpg" />
            </a>
            <a href="/photos/desk-samira.jpg">
              <Image height={280} width={386} src="/photos/desk-samira.jpg" />
            </a>
            <a href="/photos/city-samira-paul.jpg">
              <Image height={280} width={334} src="/photos/city-samira-paul.jpg" />
            </a>
            <a href="/photos/aboutus-utah-road.jpg">
              <Image height={280} width={280} src="/photos/aboutus-utah-road.jpg" />
            </a>
            <a href="/photos/about-paul-rocks.jpg">
              <Image height={280} width={280} src="/photos/about-paul-rocks.jpg" />
            </a>
          </div>
          <div className="arrows top">
            <span className="arrow arrow-left prev">
              <FA icon={faAngleLeft} className="" />
            </span>
            <span className="arrow arrow-right next">
              <FA icon={faAngleRight} className="" />
            </span>
          </div>
        </div>
      </CarouselStyled>
    );
  }
}
