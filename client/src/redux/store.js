import { createStore } from 'redux';

const initialState = {
  news: [],
  category: 'Tech'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return { ...state, news: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store };
