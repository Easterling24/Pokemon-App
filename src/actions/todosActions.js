import axios from 'axios';
import {
	FETCHING_TODOS,
	RESOLVING_TODOS,
	REJECTING_TODOS,
	ADDING_TODO,
	TOGGLE_TODO,
	UPDATE_TODO,
	COMPLETE_TODO
} from '../constants/todoConstants';

export const listTodos = () => async (dispatch) => {
	dispatch({
		type: FETCHING_TODOS
	});

	try {
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

		setTimeout(() => {
			dispatch({
				type: RESOLVING_TODOS,
				payload: data
			});
		}, 800);
	} catch (error) {
		dispatch({
			type: REJECTING_TODOS,
			payload: error.response
		});
	}
};

export const completeTodo = (id) => (dispatch) => {
	dispatch({
		type: COMPLETE_TODO,
		payload: {
			id
		}
	});
};

export const addTodo = (data, title) => (dispatch) => {
	dispatch({
		type: ADDING_TODO,
		payload: {
			userId: 10,
			id: data.length + 1,
			title,
			comleted: false
		}
	});
};

export const toggleTodo = (id) => (dispatch) => {
	dispatch({
		type: TOGGLE_TODO,
		payload: id
	});
};

export const updateTodo = (id, title) => (dispatch) => {
	dispatch({
		type: UPDATE_TODO,
		payload: {
			id,
			title
		}
	});
};
