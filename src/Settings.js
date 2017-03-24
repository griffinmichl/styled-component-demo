import React from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import Button from './Button';

const FlexContainer = styled.div`
  flex-direction: column;
  display: flex;
  visibility: ${props => props.visibility || 'visible'};
  position: absolute;
  background: white;
  border: 1px solid grey;
  padding: 10px 20px;
`;

const FlexChild = styled.div`
  flex-grow: 1;
`;

const FlexChildProtected = props => <FlexChild onMouseDown={ e => e.stopPropagation() } { ...props} />

const colorFieldOptions = ['background', 'backgroundHover'];

class Settings extends React.Component {
  state = {
    currentColorField: 'background',
  }

  handleCurrentColorFieldChange = e => this.setState({
    currentColorField: e.target.value,
  })

  render() {
    const {
      background,
      backgroundHover,
      fontSize,
      handleFontSizeChange,
      handleChangeComplete,
      className,
      handleClose,
      ...rest,
    } = this.props;

    return (
      <FlexContainer className={ className } { ...rest } style={ { top: rest.top, left: rest.left } }>
        <FlexChildProtected>
          <Button onClick={ handleClose }>Close</Button>
        </FlexChildProtected>
        <FlexChildProtected>
          <label htmlFor='fontSize'>Font Size</label>
          <input id='fontSize' type='range' value={ fontSize } min={ 8 } max={ 40 } onChange={ handleFontSizeChange } />
        </FlexChildProtected>
        <FlexChildProtected>
          <select value={ this.state.currentColorField } onChange={ this.handleCurrentColorFieldChange }>
            { colorFieldOptions.map(opt => (
              <option
                name={ opt }
                value={ opt }
              >
                { opt }
              </option>
            )) }
          </select>
          <SketchPicker
            color={ this.props.colorFieldValues[this.state.currentColorField] }
            onChange={ handleChangeComplete(this.state.currentColorField) }
          />
        </FlexChildProtected>
      </FlexContainer>
    )
  }
}

const mapStateToProps = state => ({
  colorFieldValues: state,
});

const mapDispatchToProps = dispatch => ({
  handleChangeComplete: field => (color) => {
    dispatch({
      type: 'SET_STYLE',
      meta: { style: field },
      payload: color.hex,
    });
  },
  handleFontSizeChange(e) {
    dispatch({
      type: 'SET_STYLE',
      meta: { style: 'fontSize' },
      payload: e.target.value,
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
