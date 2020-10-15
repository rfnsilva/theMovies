import styled, { keyframes } from 'styled-components';

// Create the keyframes
const uncheck = keyframes`
  0% {
      transform: rotate(-30deg) translateX(13.5px) translateY(8px);
  }
  50% {
      transform: rotate(30deg) translateX(9px);
  }
  75% {
      transform: rotate(30deg) translateX(4.5px) scaleX(1.1);
  }
  100% {
      transform: rotate(30deg);
  }
`;

// Create the keyframes
const check = keyframes`
  0% {
      transform: rotate(30deg);
  }
  25% {
      transform: rotate(30deg) translateX(4.5px) scaleX(1.1);
  }
  50% {
      transform: rotate(30deg) translateX(9px);
  }
  100% {
      transform: rotate(-30deg) translateX(13.5px) translateY(8px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  > label {
    --duration: .45s;
    --stroke: #D1D6EE;
    --stroke-active: #ec4472;
    --fill: #fff;
    --fill-active: #ec638e;
    --shadow: #{rgba(#00093D, .25)};
    cursor: pointer;
    position: relative;
    transform: scale(var(--s, 1)) translateZ(0);
    transition: transform .2s;
    -webkit-tap-highlight-color: transparent;
    &:active {
        --s: .95;
    }

    > input {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: absolute;
      border: 1px solid #bbbbbb;
      pointer-events: none;
      z-index: 1;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px 0 var(--shadow);
      & + svg {
          width: 36px;
          height: 25px;
          fill: var(--fill);
          stroke: var(--stroke);
          stroke-width: 1px;
          stroke-linejoin: round;
          display: block;
          transition: stroke var(--duration), fill var(--duration);
      }
      &:not(:checked) {
          animation: ${uncheck} var(--duration) linear forwards;
      }
      &:checked {
          animation: ${check} var(--duration) linear forwards;
          & + svg {
              --fill: var(--fill-active);
              --stroke: var(--stroke-active);
          }
        }
      }
    }
  }
`;
