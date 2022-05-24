import '../styles/TodoForm.css';
import { useSelector, useDispatch } from 'react-redux';
import {addTodo} from "../actions/todosActions"
import { useState } from 'react';

export default function TodoForm({ data }) {
	const [ inputValue, setInutValue ] = useState('');
	const dispatch = useDispatch();
	const theme = useSelector(state => state.theme);

	return (
		<div className="form-wrapper">
			<input
				type="text"
				value={inputValue}
				onInput={(e) => {
					setInutValue(e.target.value);
				}}
				placeholder="Write a new task"
			/>

			<button
				disabled={inputValue === ''}
				onClick={() => {
					dispatch(addTodo(data, inputValue.trim()), setInutValue(''));
				}}
			>
				Add
			</button>
		</div>
	);
}
