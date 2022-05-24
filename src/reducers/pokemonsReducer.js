import {
	FETCHING_POKEMONS,
	RESOLVING_POKEMONS,
	REJECTING_POKEMONS,
	NEXTPAGE_POKEMONS,
	PREVIOUS_PAGE_POKEMONS
} from '../constants/pokemonConstants';

const initialState = {
	currentOffset: 0,
	data: [],
	loading: true
};

export default function pokemonsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING_POKEMONS:
			return {
				...state,
				loading: true,
				data: []
			};

		case RESOLVING_POKEMONS:
			return {
				...state,
				loading: false,
				data: action.payload.data.results,
				currentOffset: action.payload.currentOffset
			};

		case REJECTING_POKEMONS:
			return {
				...state,
				loading: false,
				error: action.payload
			};

		case NEXTPAGE_POKEMONS:
			return {
				...state,
				currentOffset: state.currentOffset + 9
			};

		case PREVIOUS_PAGE_POKEMONS:
			return {
				...state,
				currentOffset: state.currentOffset - 9
			};

		default:
			return state;
	}
}
