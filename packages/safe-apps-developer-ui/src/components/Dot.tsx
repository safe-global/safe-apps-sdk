import styled from 'styled-components';
import { ThemeColors } from '../styles/styled-theme';

type Props = {
  className?: string;
  color: ThemeColors;
  children: React.ReactNode;
};

const StyledDot = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

const Dot = ({ children, ...rest }: Props): React.ReactElement => <StyledDot {...rest}>{children}</StyledDot>;

export { Dot };
