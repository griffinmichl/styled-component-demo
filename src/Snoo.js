import React from 'react';
import styled from 'styled-components';

const PositionableImage = styled.img`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
`;

export default PositionableImage;