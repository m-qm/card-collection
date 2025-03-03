import { combineReducers } from 'redux';
import { cardReducer } from './cardReducer';
import { collectionReducer } from './collectionReducer';

const rootReducer = combineReducers({
  cards: cardReducer,
  collections: collectionReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;