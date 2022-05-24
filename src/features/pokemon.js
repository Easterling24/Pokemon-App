import { selectPokemon } from '../utils/selectors';

const initialState = {
	loading: true
};

const FETCNHING = 'pokemon/fetching';
const RESOLVED = 'pokemon/resolved';
const REJECTED = 'pokemon/rejected';

const fetchingPokemon = () => ({ type: FETCNHING });
const resolvingPokemon = (pokemonID, data) => ({ type: RESOLVED, payload: { pokemonID, data } });
const rejectingPokemon = (pokemonID, error) => ({ type: REJECTED, payload: { pokemonID, error } });

export async function fetchOrUpdatePokemon(store, pokemonID) {
	const pokemon = selectPokemon(pokemonID)
	console.log(pokemon)

	store.dispatch(fetchingPokemon());

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`);
		const data = await response.json();

		setTimeout(() => {
			store.dispatch(resolvingPokemon(pokemonID, data));
		}, 1000);
	} catch (error) {
		store.dispatch(rejectingPokemon(pokemonID, error));
	}
}

export default function pokemonReducer(state = initialState, action) {
	switch (action.type) {
		case FETCNHING:
			return {
				...state,
				loading: false
			};

		case RESOLVED:
		

			return {
				...state,
				loading: false,
				pokemon: (action.payload.pokemonID = action.payload.data)
			};

		case REJECTED:
			return {
				loading: false
			};

		default:
			return state;
	}

	// const { type, payload } = action;

	// return produce(state, (draft) => {
	// 	if (type === RESOLVED || type === REJECTED || type === FETCNHING) {
	// 		if (draft[payload.pokemonID] === undefined) {
	// 			draft[payload.pokemonID] = { status: 'void' };
	// 		}
	// 	}

	// 	switch (type) {
	// 		case FETCNHING: {
	// 			if (draft[payload.pokemonID].status === 'void') {
	// 				draft[payload.pokemonID].status = 'pending';
	// 				return;
	// 			}

	// 			if (draft[payload.pokemonID].status === 'rejected') {
	// 				draft[payload.pokemonID].error = null;
	// 				draft[payload.pokemonID].status = 'pending';
	// 				return;
	// 			}

	// 			if (draft[payload.pokemonID].status === 'resolved') {
	// 				draft[payload.pokemonID].status = 'updating';
	// 				return;
	// 			}

	// 			return;
	// 		}

	// 		case RESOLVED: {
	// 			if (draft[payload.pokemonID].status === 'pending' || draft[payload.pokemonID].status === 'updating') {
	// 				draft[payload.pokemonID].data = payload.data;
	// 				draft[payload.pokemonID].status = 'resolved';
	// 				return;
	// 			}

	// 			return;
	// 		}

	// 		case REJECTED: {
	// 			if (draft[payload.pokemonID].status === 'pending' || draft[payload.pokemonID].status === 'updating') {
	// 				draft[payload.pokemonID].error = payload.error;
	// 				draft[payload.pokemonID].error = null;
	// 				draft[payload.pokemonID].status = 'rejected';
	// 				return;
	// 			}

	// 			return;
	// 		}

	// 		default:
	// 			return;
	// 	}
	// });
}
