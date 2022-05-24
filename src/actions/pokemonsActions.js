import {
	FETCHING_POKEMONS,
	RESOLVING_POKEMONS,
	REJECTING_POKEMONS,
	NEXTPAGE_POKEMONS,
	PREVIOUS_PAGE_POKEMONS
} from '../constants/pokemonConstants';

import axios from 'axios';

export const listPokemons = (currentOffset) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_POKEMONS });
		const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=9`);

		setTimeout(() => {
			dispatch({ type: RESOLVING_POKEMONS, payload: { data, currentOffset } });
		}, 800);
	} catch (error) {
		dispatch({
			type: REJECTING_POKEMONS,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const nextPage = (currentOffset) => async (dispatch) => {
	dispatch({ type: NEXTPAGE_POKEMONS, payload: { currentOffset } });
};

export const previousPage = (currentOffset) => async (dispatch) => {
	dispatch({ type: PREVIOUS_PAGE_POKEMONS, payload: { currentOffset } });
};
