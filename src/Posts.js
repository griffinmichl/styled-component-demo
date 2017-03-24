import React, { Component } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import Post from './Post';

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    fetch('https://www.reddit.com/.json')
      .then(res => res.json())
      .then(R.compose(
        R.map(R.prop('data')),
        R.path(['data', 'children']),
      ))
      .then(posts => this.setState({
        posts,
      }));
  }

  render() {
    return (
      <div className={ this.props.className }>
        { this.state.posts.map((data, i) => <Post key={ i } { ...data } />) }
      </div>
    );
  }
}

export default Posts;
