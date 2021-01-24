import styled from "styled-components";

export const ImageDivStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
  &.ImageWithZoom {
    div {
      width: 100%;
      height: 100%;
      background-position: center;
    }
  }
`;

export const CarouselStyled = styled.div`
  margin: 1.25rem 0.5rem 1.75rem -0.25rem;
  .horizontal_carousel {
    position: relative;
  }
  /*
   * controls
   */
  .arrows {
    //display:none;
    position: absolute;
    width: calc(100% + 2rem);
    height: 100%;
    left: -1.125rem;
    pointer-events: none;
    .arrow {
      pointer-events: all;
      position: absolute;
      border-radius: 30px;
      width: 60px;
      height: 60px;
      background: none;
      font-size: 3.33rem;
      line-height: 3rem;
      color: white;
      background: var(--color-primary);
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
      border: none;
      outline: none;
      svg {
        position: relative;
        top: -0.025rem;
        font-size: 64px;
      }
      &.arrow-right {
        right: -10px;
        svg {
          width: 85%;
          right: 0.05rem;
        }
      }
      &.arrow-left {
        left: -6px;
        svg {
          width: 85%;
          left: 0.45rem;
        }
      }
      &[disabled] {
        opacity: 0.175;
        cursor: default;
        //border-color: transparent;
      }
    }
    &.top {
      top: 0;
      .arrow {
        top: 41%;
      }
    }
    &.middle {
      top: 0;
      .arrow {
        top: calc(72.5% - 1.25rem);
      }
    }
    &.bottom {
      bottom: -2.25rem;
      .arrow {
        bottom: 1.67rem;
        background: none;
        color: var(--color-primary);
        box-shadow: none;
        &[disabled] {
          opacity: 0;
        }
      }
    }
  }
`;
