import { selectPokemons } from '../utils/selectors';

const initialState = {
	currentOffset: 0,
	data: null,
	loading: true
};

//Constants

const FETCHING = 'pokemons/fetching';
const RESOLVED = 'pokemons/resolved';
const REJECTED = 'pokemons/rejected';
const NEXTPAGE = 'pokemons/next';
const PREVIOUS = 'pokemon/previous';

//Actions
export const fetchingPokemons = () => ({ type: FETCHING });
export const resolvingPokemons = (data, current) => ({ type: RESOLVED, payload: { data, current } });
export const rejectingPokemons = (error) => ({ type: REJECTED, payload: error });
export const nextPage = (current) => ({ type: NEXTPAGE, payload: { current } });
export const previousPage = (current) => ({ type: PREVIOUS, payload: { current } });

export async function fetchOrUpdatePokemons(store, current) {
	current = selectPokemons(store.getState()).currentOffset;

	store.dispatch(fetchingPokemons());

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${current}&limit=9`);
		const data = await response.json();

		setTimeout(() => {
			store.dispatch(resolvingPokemons(data, current));
		}, 1500);
	} catch (error) {
		store.dispatch(rejectingPokemons(error));
	}
}

export default function pokemonsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING:
			return {
				...state,
				loading: true,
				data: null
			};

		case RESOLVED:
			return {
				...state,
				loading: false,
				data: action.payload,
				// currentOffset: action.payload.current
			};

		case NEXTPAGE:
			return {
				...state,
				currentOffset: action.payload.current + 9
			};

		case PREVIOUS:
			return {
				...state,
				currentOffset: action.payload.current - 9
			};

		default:
			return state;
	}
}
