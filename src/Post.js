import React from 'react';
import Anchor from './Anchor';
import styled from 'styled-components';

const Post = ({
  author,
  thumbnail,
  title,
  url,
  className
}) => (
  <article className={ className }>
    <div>
      <Anchor href={ url }>
        <img src={ thumbnail } />
        <p>{ title }</p>
      </Anchor>
    </div>
    <div>
      Posted By: { author }
    </div> 
  </article>
)

Post.defaultProps = {
  color: 'rebeccapurple',
  background: 'peru',
  fontSize: '12px',
};

export default styled(Post)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  font-family: Helvetica, Arial, sans-serif;
  background: ${props => props.theme.background};
  font-size: ${props => props.theme.fontSize + 'px'};


  &:hover {
    text-decoration: underline;
    background: ${props => props.theme.backgroundHover}
  }
`;