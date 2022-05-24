const initialState = {
	data: null,
	error: null,
	loading: true,
	toggled: false
};

const FETCNHING_TODOS = 'todos/fetching';
const RESOLVING_TODOS = 'todos/resolved';
const REJECTING_TODOS = 'todos/rejected';

const CREATE_TODO = 'todo/create';
const COMPLETE_TODO = 'todo/remove';

const TOGGLE_TODO = 'todo/toggle';
const UPDATE_TODO = 'todo/update';

// Fetching todos

const fetchingTodos = () => ({ type: FETCNHING_TODOS });
const resolvingTodos = (data) => ({ type: RESOLVING_TODOS, payload: { data } });
const rejectingTodos = (error) => ({ type: REJECTING_TODOS, payload: { error } });

export const createTodo = (data, title) => ({
	type: CREATE_TODO,
	payload: { userId: 10, id: data.length + 1, title, completed: false }
});

export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: { id } });
export const updateTodo = (id, title) => ({ type: UPDATE_TODO, payload: { id, title } });
export const removeTodo = (id) => ({ type: COMPLETE_TODO, payload: { id } });

export async function fetchOrUpdateTodos(store, id) {
	store.dispatch(fetchingTodos());

	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');

		const data = await response.json();
		setTimeout(() => {
			store.dispatch(resolvingTodos(data, id));
		}, 1500);
	} catch (error) {
		store.dispatch(rejectingTodos(error));
	}
}

export default function todosReducer(state = initialState, action) {
	switch (action.type) {
		case FETCNHING_TODOS:
			return {
				loading: true
			};

		case RESOLVING_TODOS:
			return { ...state, loading: false, data: action.payload.data };

		case REJECTING_TODOS:
			return { ...state, loading: false, error: action.payload.error };

		case CREATE_TODO:
			return {
				...state,

				data: [ ...state.data, action.payload ].sort((a, b) => b.id - a.id)
			};

		case COMPLETE_TODO:
			return {
				...state,
				data: state.data.map(
					(todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo)
				)
			};

		case TOGGLE_TODO:
			return {
				...state,
				data: state.data.map(
					(todo) => (todo.id === action.payload.id ? { ...todo, toggled: true } : { ...todo, toggled: false })
				)
			};

		case UPDATE_TODO:
			return {
				...state,
				data: state.data.map((todo) => {
					if (todo.id === action.payload.id) {
						return {
							...todo,
							title: action.payload.title === '' ? todo.title : action.payload.title,
							toggled: false
						};
					} else {
						return todo;
					}
				})
			};

		default:
			return state;
	}
}
