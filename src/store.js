import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { loadState } from './localStorage';

const persistedState = loadState();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
  );
  return store;
}
