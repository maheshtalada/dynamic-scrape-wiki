import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {responsiveStoreEnhancer} from 'redux-responsive';
import dynamicMiddlewares from 'redux-dynamic-middlewares';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
	dynamicMiddlewares
)(createStore);

export default function configureStore(initialState = {}) {
	const store = createStoreWithMiddleware(rootReducer, initialState, responsiveStoreEnhancer);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
}
