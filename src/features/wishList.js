const initialState = {
	loading: true,
	wishList: []
};

const FETCHING_WISH_LIST = 'wishlList/fetching';
const ADD_TO_WISHLIST = 'wishList/addWishItem';
const REMOVE_FROM_WISHLIST = 'wishList/removeWishItem';

export const fetchingWishList = (wishList) => ({ type: FETCHING_WISH_LIST, payload: wishList });
export const addToWishList = (name, url) => ({ type: ADD_TO_WISHLIST, payload: { name, url } });
export const removeFromWishList = (name) => ({ type: REMOVE_FROM_WISHLIST, payload: { name } });

export function fetchOrUpdateWishList(store) {
	setTimeout(() => {
		store.dispatch(fetchingWishList());
	}, 1000);
}

if (localStorage.getItem('wishList')) {
	initialState.wishList = JSON.parse(localStorage.getItem('wishList'));
}

export default function wishListReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING_WISH_LIST:
			return {
				...state,
				loading: false
			};

		case ADD_TO_WISHLIST:
			const item = action.payload.name;
			const existItem = state.wishList.find((elt) => elt.name === item);

			return {
				...state,

				wishList: existItem ? state.wishList.filter((elt) => elt.name) : [ ...state.wishList, action.payload ]
			};

		case REMOVE_FROM_WISHLIST:
			const removedItem = action.payload.name;

			return { ...state, wishList: state.wishList.filter((elt) => elt.name !== removedItem) };

		default:
			return state;
	}
}
