import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  bordered?: boolean;
  fullWidth?: boolean;
};

const Img = styled.img<ImgProps>`
  max-width: 100%;
  box-sizing: border-box;

  ${(props) => props.bordered && 'border: 1px solid #ddd;'}

  ${(props) =>
    props.fullWidth &&
    `
    padding: 0;
    width: 40% !important;
    margin: 0 60% 25px !important;
  `}
`;

export { Img };
