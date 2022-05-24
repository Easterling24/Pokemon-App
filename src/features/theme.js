const TOGGLE_THEME = 'pokemons/toggle';
const SET_THEME = 'pokemon/set-theme';

export const toggleTheme = () => ({ type: TOGGLE_THEME });
export const setTheme = (theme = 'light') => ({ type: SET_THEME, payload: { theme } });

export default function themeReducer(state = 'light', action) {
	switch (action.type) {
		case TOGGLE_THEME: {
			return state === 'light' ? 'dark' : 'light';
		}

		case SET_THEME: {
			return action.payload;
		}

		default:
			return state;
	}
}
