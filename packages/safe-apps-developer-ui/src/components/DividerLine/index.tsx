import React from 'react';
import styled from 'styled-components';

import ArrowDown from './arrow-down.svg';

import { md, sm, border } from 'src/styles/variables';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${md} 0;

  img {
    margin: 0 ${sm};
  }

  hr {
    width: 100%;
    min-height: 2px;
    height: 2px;
    background-color: ${border};
    margin: 0;
  }
`;

type Props = {
  withArrow?: boolean;
};

const DividerLine = ({ withArrow }: Props): React.ReactElement => (
  <Wrapper>
    {withArrow && <img alt="Arrow Down" src={ArrowDown} />}
    <hr />
  </Wrapper>
);

export { DividerLine };
