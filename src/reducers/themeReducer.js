import { TOGGLE_THEME, SET_THEME } from '../constants/themeConstants';

export default function themeReducer(state = 'light', action) {
	switch (action.type) {
		case TOGGLE_THEME:
			return state === 'light' ? 'dark' : 'light';

		case SET_THEME:
			return action.payload;

		default:
			return state;
	}
}
