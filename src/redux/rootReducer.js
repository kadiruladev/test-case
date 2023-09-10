// redux/rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer, // userSlice'dan gelen reducer'ı ekleyin
  // Diğer reducer'ları buraya ekleyebilirsiniz
});

export default rootReducer;
