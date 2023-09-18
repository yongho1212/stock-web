import React from 'react'
import styled from 'styled-components';

interface SpacerProps {
    width?: string | number;
    height?: string | number;
}

const StyledSpacer = styled.div<SpacerProps>`
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width || '100%')};
  height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height || '100%')};
`;

const Spacer: React.FC<SpacerProps> = (props) => {
  return <StyledSpacer width={props.width} height={props.height} />;
};

export default Spacer;