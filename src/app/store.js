import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { getAllBarsApi, getBarDetailsApi } from './api';

const defaultState = {
  barDetails: {
    products: [],
  },
  bars: [],
  searchText: '',
  order: {
    id: null,
    name: null,
    items: [],
  },
};

export const actionTypes = {
  SET_BAR_DETAILS: 'SET_BAR_DETAILS',
  SET_BARS: 'SET_BARS',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_ORDER_ID: 'SET_ORDER_ID',
  ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
  REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER',
};

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_BAR_DETAILS:
      return Object.assign({}, state, {
        barDetails: action.value || defaultState.barDetails,
      });
    case actionTypes.SET_BARS:
      return Object.assign({}, state, {
        bars: action.items || defaultState.bars,
      });
    case actionTypes.SET_SEARCH_TEXT:
      return Object.assign({}, state, {
        searchText: action.value || defaultState.searchText,
      });
    case actionTypes.SET_ORDER_ID:
      return Object.assign({}, state, {
        order: Object.assign({}, defaultState.order, {
          id: action.value,
          name: action.name,
        }),
      });
    case actionTypes.ADD_ITEM_TO_ORDER: {
      return Object.assign({}, state, {
        order: Object.assign({}, state.order, {
          items: [...state.order.items, action.item],
        }),
      });
    }
    case actionTypes.REMOVE_ITEM_FROM_ORDER: {
      return Object.assign({}, state, {
        order: Object.assign({}, state.order, {
          items: state.order.items.filter((item, index) => action.index !== index),
        }),
      });
    }
    default: return state;
  }
};

// ACTIONS
export const getAllBars = () => dispatch => (
  getAllBarsApi().then(items => dispatch({ type: actionTypes.SET_BARS, items }))
);

export const getBarDetails = id => dispatch => (
  getBarDetailsApi(id).then(value => dispatch({ type: actionTypes.SET_BAR_DETAILS, value }))
);

export const clearBarDetails = () => dispatch => (
  dispatch({ type: actionTypes.SET_BAR_DETAILS, value: null })
);

export const setSearchText = value => dispatch => (
  dispatch({ type: actionTypes.SET_SEARCH_TEXT, value })
);

export const setOrderId = (value, name) => dispatch => (
  dispatch({ type: actionTypes.SET_ORDER_ID, value, name })
);

export const addItemToOrder = item => dispatch => (
  dispatch({ type: actionTypes.ADD_ITEM_TO_ORDER, item })
);

export const removeItemFromOrder = index => dispatch => (
  dispatch({ type: actionTypes.REMOVE_ITEM_FROM_ORDER, index })
);

export const initStore = (initialState = defaultState) => (
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);
