import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from '@/Components/App'
import mainReducer from '@/reducers/mainReducer'
import {initialState} from '@/initialState'
// import logger from 'redux-logger'

import '@/scss/main.scss';

// const store = createStore(mainReducer, initialState, applyMiddleware(logger));
const store = createStore(mainReducer, initialState);
render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

