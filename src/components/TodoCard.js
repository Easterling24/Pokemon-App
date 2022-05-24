import { useState } from 'react';
import '../styles/TodoCard.css';

import { useDispatch, useSelector } from 'react-redux';

import { toggleTodo, updateTodo, completeTodo } from '../actions/todosActions';

export default function TodoCard({ id, title, completed, toggled }) {
	const [ inputValue, setInputValue ] = useState('');

	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme);

	const handleEditTodo = (todo) => {
		if (toggled === true) {
			dispatch(updateTodo(todo, inputValue));
		} else {
			dispatch(toggleTodo(todo));
		}
	};

	return (
		<div
			className="todo-card-container"
			style={theme === 'dark' ? { background: 'rgb(60, 69, 104)' } : { background: '#819e94' }}
		>
			<div className="todo-text" style={toggled === true ? { display: 'none' } : { dispaly: 'block' }}>
				<span
					style={
						completed === true ? (
							{ textDecorationLine: 'line-through', width: '500px', textAlign: 'left' }
						) : (
							{ width: '500px', textAlign: 'left' }
						)
					}
				>
					{title}
				</span>
			</div>
			<div
				className="edit-todo"
				style={toggled === true ? { display: 'block', width: '100%' } : { display: 'none' }}
			>
				<input value={inputValue} onInput={(e) => setInputValue(e.target.value)} />
			</div>

			<div className="todo-card-btns">
				<button
					onClick={() => handleEditTodo(id)}
					disabled={completed=== true}
					className="edit-todo-btn"
		
				>
					{toggled === true ? 'Done?' : 'Edit'}
				</button>
				<button
					className="complete-todo-btn"
					disabled={toggled===true}
				// 	style={theme === 'dark' ? { background: '#adb7d3' } : { background: '#8d9489' } 

				
				// }
					onClick={() => {
						dispatch(completeTodo(id));
					}}
				>
					{' '}
					{completed === true ? 'Completed!' : 'Complete Task'}
				</button>
			</div>
		</div>
	);
}
