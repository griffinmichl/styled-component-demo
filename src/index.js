import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ThemeProvider } from 'styled-components';
import { loadState, saveState } from './localStorage';
import App from './App';

const initialUserStyles = {
  background: '#ffefd5',
  backgroundHover: '#db7093',
  fontSize: '12',
};

const userStyles = (state = initialUserStyles, action) => {
  switch (action.type) {
    case 'SET_STYLE':
      return {
        ...state,
        [action.meta.style]: action.payload,
      };
    default:
      return state;
  }
};

const persistedState = loadState();

const store = createStore(
  userStyles,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => saveState(store.getState()))

const ThemeProviderConnected = connect(state => ({ theme: state }))(ThemeProvider);

ReactDOM.render(
  <Provider store={ store }>
    <ThemeProviderConnected>
      <App />
    </ThemeProviderConnected>
  </Provider>,
  document.getElementById('root')
);
