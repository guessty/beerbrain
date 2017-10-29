import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { _getAllBars, _getBarDetails} from './api'

const initialState = {
  barDetails: {
    products: []
  },
  bars: [],
  searchText: '',
  order: {
    id: null,
    items: []
  }
}

export const actionTypes = {
  SET_BAR_DETAILS: 'SET_BAR_DETAILS',
  SET_BARS: 'SET_BARS',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_ORDER_ID: 'SET_ORDER_ID',
  ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BAR_DETAILS:
      return Object.assign({}, state, {
        barDetails: action.value || initialState.barDetails
      })
    case actionTypes.SET_BARS:
      return Object.assign({}, state, {
        bars: action.items || initialState.bars
      })
    case actionTypes.SET_SEARCH_TEXT:
      return Object.assign({}, state, {
        searchText: action.value || initialState.searchText
      })
    case actionTypes.SET_ORDER_ID:
      return Object.assign({}, state, {
        order: Object.assign({}, initialState.order, {
          id: action.value
        })
      })
    case actionTypes.ADD_ITEM_TO_ORDER: {
      return Object.assign({}, state, {
        order: Object.assign({}, state.order, {
          items: [...state.order.items, action.item]
        })
      })
    }
    default: return state
  }
}

// ACTIONS
export const getAllBars = () => dispatch => {
  return _getAllBars().then((items) => dispatch({ type: actionTypes.SET_BARS, items }))
}

export const getBarDetails = (id) => dispatch => {
  return _getBarDetails(id).then((value) => dispatch({ type: actionTypes.SET_BAR_DETAILS, value }))
}

export const clearBarDetails = () => dispatch => {
  return dispatch({ type: actionTypes.SET_BAR_DETAILS, value: null })
}

export const setSearchText = (value) => dispatch => {
  return dispatch({ type: actionTypes.SET_SEARCH_TEXT, value })
}

export const setOrderId = (value) => dispatch => {
  return dispatch({ type: actionTypes.SET_ORDER_ID, value })
}

export const addItemToOrder = (item) => dispatch => {
  return dispatch({ type: actionTypes.ADD_ITEM_TO_ORDER, item })
}

export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
