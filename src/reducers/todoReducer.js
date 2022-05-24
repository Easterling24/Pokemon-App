import {
	FETCHING_TODOS,
	RESOLVING_TODOS,
	REJECTING_TODOS,
	COMPLETE_TODO,
	ADDING_TODO,
	TOGGLE_TODO,
	UPDATE_TODO
} from '../constants/todoConstants';

const initialState = {
	loading: true,
	data: null
};

export default function todoReducer(state = initialState, action) {
	switch (action.type) {
		case FETCHING_TODOS:
			return {
				...state,
				loading: true
			};

		case RESOLVING_TODOS:
			return {
				...state,
				loading: false,
				data: action.payload
			};

		case REJECTING_TODOS:
			return {
				...state,
				loading: false
			};

		case ADDING_TODO:
			const addedTodo = action.payload;

			return {
				...state,
				data: [ ...state.data, addedTodo ].sort((a, b) => b.id - a.id)
			};

		case TOGGLE_TODO:
			const selectedTodo = action.payload;

			return {
				...state,
				data: state.data.map(
					(todo) => (todo.id === selectedTodo ? { ...todo, toggled: true } : { ...todo, toggled: false })
				)
			};

		case UPDATE_TODO:
			const todoId = action.payload.id;
			const editedTodo = action.payload.title;

			return {
				...state,
				data: state.data.map(
					(todo) =>
						todo.id === todoId
							? { ...todo, title: editedTodo === '' ? todo.title : editedTodo, toggled: false }
							: { ...todo, toggled:false}
				)
			};

		case COMPLETE_TODO:

			return {
				...state,
				data: state.data.map(
					(todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed, toggled: false } : todo)
				)
			};

		default:
			return state;
	}
}
