import { combineReducers } from 'redux';
import { collectionReducer } from './collectionReducer';

const rootReducer = combineReducers({
  collectionState: collectionReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;