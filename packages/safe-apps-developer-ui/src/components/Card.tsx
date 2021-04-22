import styled from 'styled-components';
import { fade } from '@material-ui/core/styles/colorManipulator';

const StyledCard = styled.div`
  box-shadow: 1px 2px 10px 0 ${({ theme }) => fade(theme.colors.shadow.color, 0.18)};
  border-radius: 8px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const DisabledOverlay = styled.div`
  opacity: 0.5;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  top: 0;
  left: 0;
  border-radius: 8px;
  transition: opacity 0.2s;
`;

type Props = {
  className?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<Props> = ({ className, children, disabled, ...rest }) => (
  <StyledCard className={className} {...rest}>
    {disabled && <DisabledOverlay />}
    {children}
  </StyledCard>
);

export { Card };
