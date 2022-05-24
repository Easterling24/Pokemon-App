import { DISPLAY_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../constants/wishListConstants';

const initialState = {
	loading: true,
	wishList: []
};

export default function wishListReducer(state = initialState, action) {
	switch (action.type) {
		case DISPLAY_WISHLIST:
			return {
				...state,
				loading: false
			};

		case ADD_TO_WISHLIST:
			const addedPokemon = action.payload.name;
			const existItem = state.wishList.find((pokemon) => pokemon.name === addedPokemon);

			return {
				...state,

				wishList: existItem ? state.wishList.filter((elt) => elt.name) : [ ...state.wishList, action.payload ]
			};

		case REMOVE_FROM_WISHLIST:
			const pokemonRemoved = action.payload.name;

			return {
				...state,
				wishList: state.wishList.filter((pokemon) => pokemon.name !== pokemonRemoved)
			};

		default:
			return state;
	}
}
