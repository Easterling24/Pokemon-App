import { TOGGLE_THEME, SET_THEME } from '../constants/themeConstants';

export const toggleTheme = () => (dispatch) => {
	dispatch({
		type: TOGGLE_THEME
	});
};

export const setTheme = (theme = 'light') => (dispatch) => {
	dispatch({ type: SET_THEME, payload: { theme } });
};
