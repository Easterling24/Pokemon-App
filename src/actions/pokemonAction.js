import axios from 'axios';
import {
	FETCHING_POKEMON_DETAIL,
	RESOLVING_POKEMONS_DETAIL,
	REJECTING_POKEMONS_DETAIL
} from '../constants/pokemonConstants';

export const getPokemonDetail = (name) => async (dispatch) => {
	dispatch({ type: FETCHING_POKEMON_DETAIL });

	try {
		const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

		setTimeout(() => {
			dispatch({
				type: RESOLVING_POKEMONS_DETAIL,
				payload: {
					id: data.data.id,
					name: data.data.name,
					height: data.data.height,
					base: data.data.base_experience,
					weight: data.data.weight,
					moves: data.data.moves,
					species: data.data.species,
					abilities: data.data.abilities,
					img : data.data.sprites.other.home.front_default
				}
			});
		}, 800);
	} catch (error) {
		dispatch({
			type: REJECTING_POKEMONS_DETAIL,
			payload: error.resposne && error.resposne.data.message ? error.message.data.message : error.message
		});
	}
};
