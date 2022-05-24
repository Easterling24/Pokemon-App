import produce from 'immer';
import { selectSearcher } from '../utils/selectors';

const initialState = {
	status: 'void',
	searchedPokemon: '',
	data: null,
	error: null,
	filteredResults: [],
	filtered: false
};

const FETCHING_ALL_POKEMONS = 'search/fetching';
const RESOLVING_ALL_POKEMONS = 'search/resolved';
const REJECTING_ALL_POKEMONS = 'search/rejected';
const FILTER_RESULTS = 'search/filtered';

export const fetchingPokemons = () => ({ type: FETCHING_ALL_POKEMONS });
export const resolvingPokemons = (data) => ({ type: RESOLVING_ALL_POKEMONS, payload: { data } });
export const rejectingPokemons = (error) => ({ type: REJECTING_ALL_POKEMONS, payload: { error } });
export const filteringResults = (word, data) => ({ type: FILTER_RESULTS, payload: { word, data } });

export async function fetchOrFilterResults(store) {
	const status = selectSearcher(store.getState()).status;

	if (status === 'pending' || status === 'updating') {
		return;
	}

	store.dispatch(fetchingPokemons());

	try {
		const results = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126');
		const data = await results.json();

		store.dispatch(resolvingPokemons(data));
	} catch (error) {
		store.dispatch(rejectingPokemons(error));
	}
}

export default function searchReducer(state = initialState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case FETCHING_ALL_POKEMONS: {
				if (draft.status === 'void') {
					draft.status = 'pending';
					return;
				}

				if (draft.status === 'rejected') {
					draft.error = null;
					draft.status = 'pending';
					return;
				}

				if (draft.status === 'resolved') {
					draft.status = 'updating';
					return;
				}
				return;
			}

			case RESOLVING_ALL_POKEMONS: {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.data = action.payload.data;
					draft.status = 'resolved';
					return;
				}

				return;
			}

			case REJECTING_ALL_POKEMONS: {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.data = null;
					draft.status = 'rejected ';
					return;
				}
				return;
			}

			case FILTER_RESULTS: {
				let searched = '';
				let data;

				if (draft.status === 'resolved') {
					draft.searchedPokemon = action.payload;
					searched = draft.searchedPokemon.word;
					data = action.payload.data.results;

					draft.filteredResults = data.filter((pokemon) =>
						pokemon.name.toLowerCase().trim().includes(searched.toLowerCase().trim())
					);

					if (searched.length === 0) {
						draft.filteredResults = [];
					}

					return;
				}

				return;
			}

			default:
				return state;
		}
	});
}
