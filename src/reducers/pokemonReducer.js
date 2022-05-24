import {
	FETCHING_POKEMON_DETAIL,
	RESOLVING_POKEMONS_DETAIL,
	REJECTING_POKEMONS_DETAIL
} from '../constants/pokemonConstants';

const initialState = {
	loading: true,
	data: {}
};

export default function pokemonReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING_POKEMON_DETAIL:
			return {
				...state,
				loading: true,
			
			};

		case RESOLVING_POKEMONS_DETAIL:
			return {
				...state,
				loading: false,
				data: action.payload
			};

		case REJECTING_POKEMONS_DETAIL:
			return {
				...state,
				loading: false,
				data: action.payload
			};

		default:
			return state;
	}
}
