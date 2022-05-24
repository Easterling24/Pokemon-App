import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

// Reducers
import pokemonsReducer from '../reducers/pokemonsReducer';
import pokemonReducer from '../reducers/pokemonReducer';
import themeReducer from '../reducers/themeReducer';
import wishListReducer from '../reducers/wishlistReducer';
import todoReducer from '../reducers/todoReducer';

const reducer = combineReducers({
	pokemons: pokemonsReducer,
	pokemon: pokemonReducer,
	wishList: wishListReducer,
	todos: todoReducer,
	theme: themeReducer
});

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware,
	devTools: process.env.NODE_ENV !== 'production'
});

export default store;
