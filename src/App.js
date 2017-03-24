import React, { Component } from 'react';
import Posts from './Posts';
import Settings from './Settings';
import Button from './Button';

class App extends Component {
  state = {
    isSettingsOpen: false,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    settingsTop: 0,
    settingsLeft: 0,
  }

  handleOpenClick = () => this.setState({
    isSettingsOpen: true,
  })

  handleCloseClick = () => this.setState({
    isSettingsOpen: false,
  })

  handleMouseDown = e => this.setState({
    isDragging: true,
    offsetX: e.nativeEvent.offsetX,
    offsetY: e.nativeEvent.offsetY,
  })

  handleMouseUp = () => this.setState({
    isDragging: false,
  })

  handleMouseLeave = () => this.setState({
    isDragging: false,
  })

  handleMouseMove = (e) => {
    e.persist();
    this.state.isDragging && this.setState((prevState) => ({
      settingsTop: e.clientY - prevState.offsetY,
      settingsLeft: e.clientX - prevState.offsetX,
    }));
  }

  render() {
    return (
      <div>
        <Button onClick={ this.handleOpenClick }>Style My Subreddit</Button>
        <Posts />
        <Settings
          handleClose={ this.handleCloseClick }
          onMouseDown={ this.handleMouseDown }
          onMouseUp={ this.handleMouseUp }
          onMouseMove={ this.handleMouseMove }
          onMouseLeave={ this.handleMouseLeave }
          visibility={ this.state.isSettingsOpen ? 'visible' : 'hidden' }
          top={ this.state.settingsTop }
          left={ this.state.settingsLeft }
        />
      </div>
    );
  }
}

export default App;
