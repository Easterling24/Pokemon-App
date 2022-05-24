import { DISPLAY_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../constants/wishListConstants';

export const displayWishList = () => (dispatch) => {
	setTimeout(() => {
		dispatch({
			type: DISPLAY_WISHLIST
		});
	}, 1000);
};

export const addPokemon = (name, url) => (dispatch) => {
	dispatch({
		type: ADD_TO_WISHLIST,
		payload: { name, url }
	});
};

export const removePokemon = (name) => (dispatch) => {
	dispatch({
		type: REMOVE_FROM_WISHLIST,
		payload: { name }
	});
};
